const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Game Contracts Interaction Test", function () {
    let fpToken;
    let rankBadge;
    let claimManager;
    let deployer;
    let alithOracleSigner;
    let player1;
    let player2;
    let player3;
    let nextTokenId; // Added to manage unique token IDs for badges

    beforeEach(async function () {
        [deployer, alithOracleSigner, player1, player2, player3] = await ethers.getSigners();
        nextTokenId = 1; // Reset token ID for each test run

        console.log("\n--- Deploying Contracts for Test ---");
        console.log("Test Deployer Address:", await deployer.getAddress());
        console.log("Test Alith Oracle Address:", await alithOracleSigner.getAddress());

        // 1. Deploy FPToken
        const FPTokenFactory = await ethers.getContractFactory("FPToken");
        fpToken = await FPTokenFactory.deploy(await deployer.getAddress());
        await fpToken.waitForDeployment();
        console.log("FPToken deployed to:", await fpToken.getAddress());

        // 2. Deploy RankBadge
        const RankBadgeFactory = await ethers.getContractFactory("RankBadge");
        rankBadge = await RankBadgeFactory.deploy();
        await rankBadge.waitForDeployment();
        console.log("RankBadge deployed to:", await rankBadge.getAddress());

        // 3. Deploy ClaimManager
        const ClaimManagerFactory = await ethers.getContractFactory("ClaimManager");
        claimManager = await ClaimManagerFactory.deploy(
            await deployer.getAddress(),           // initialOwner for ClaimManager
            await fpToken.getAddress(),             // FPToken address
            await rankBadge.getAddress()            // RankBadge address
        );
        await claimManager.waitForDeployment();
        console.log("ClaimManager deployed to:", await claimManager.getAddress());
        console.log("ClaimManager: Constructed with fpToken:\n%s\nrankBadge:\n%s",
            await fpToken.getAddress(), await rankBadge.getAddress());

        // Set Alith for FPToken to alithOracleSigner
        console.log("Setting Alith for FPToken to alithOracleSigner...");
        await fpToken.connect(deployer).setAlith(await alithOracleSigner.getAddress());
        expect(await fpToken.alithOracle()).to.equal(await alithOracleSigner.getAddress());
        console.log("FPToken Alith oracle set to:", await alithOracleSigner.getAddress());

        // Set ClaimManager contract address in FPToken for burning permissions
        console.log("Setting ClaimManager contract in FPToken for burn permissions...");
        await fpToken.connect(deployer).setClaimManagerContract(await claimManager.getAddress());
        expect(await fpToken.claimManagerContract()).to.equal(await claimManager.getAddress());
        console.log("FPToken's ClaimManager set to:", await claimManager.getAddress());

        // Set ClaimManager contract address in RankBadge for minting permissions
        console.log("Setting ClaimManager contract in RankBadge for mint permissions...");
        await rankBadge.connect(deployer).setClaimManagerContract(await claimManager.getAddress());
        expect(await rankBadge.claimManagerContract()).to.equal(await claimManager.getAddress());
        console.log("RankBadge's ClaimManager set to:", await claimManager.getAddress());

        // Transfer RankBadge ownership to ClaimManager (as an intermediate step for `setAlith` in ClaimManager)
        console.log("Transferring RankBadge ownership to ClaimManager...");
        await rankBadge.connect(deployer).transferOwnership(await claimManager.getAddress());
        expect(await rankBadge.owner()).to.equal(await claimManager.getAddress());
        console.log("RankBadge ownership confirmed to ClaimManager.");

        // Set Alith for ClaimManager (this also transfers RankBadge ownership from ClaimManager to alithOracleSigner)
        console.log("Setting Alith for ClaimManager (transfers RankBadge ownership to Alith)...");
        await claimManager.connect(deployer).setAlith(await alithOracleSigner.getAddress());
        expect(await claimManager.alithOracle()).to.equal(await alithOracleSigner.getAddress());
        // Verify RankBadge ownership transferred directly to alithOracleSigner as per ClaimManager's setAlith logic
        expect(await rankBadge.owner()).to.equal(await alithOracleSigner.getAddress());
        console.log("ClaimManager Alith oracle set to:", await alithOracleSigner.getAddress());
        console.log("RankBadge ownership confirmed to Alith oracle.");

        console.log("--- Contract Setup Complete ---");
    });

    describe("FPToken Functionality", function () {
        it("should allow Alith to distribute Rift XP", async function () {
            const winner = await player1.getAddress();
            const firstExtraction = await player2.getAddress();
            const secondExtraction = await player3.getAddress();

            const initialPlayer1Balance = await fpToken.balanceOf(winner);
            const initialPlayer2Balance = await fpToken.balanceOf(firstExtraction);
            const initialPlayer3Balance = await fpToken.balanceOf(secondExtraction);

            console.log("Distributing Rift XP...");
            await fpToken.connect(alithOracleSigner).distributeRiftXP(
                winner,
                firstExtraction,
                secondExtraction
            );

            // Check balances
            expect(await fpToken.balanceOf(winner)).to.equal(initialPlayer1Balance + ethers.parseEther("50"));
            expect(await fpToken.balanceOf(firstExtraction)).to.equal(initialPlayer2Balance + ethers.parseEther("30"));
            expect(await fpToken.balanceOf(secondExtraction)).to.equal(initialPlayer3Balance + ethers.parseEther("20"));
            console.log("Rift XP distributed and verified.");
        });

        it("should revert if non-Alith tries to distribute Rift XP", async function () {
            await expect(
                fpToken.connect(player1).distributeRiftXP(
                    await player1.getAddress(),
                    await player2.getAddress(),
                    await player3.getAddress()
                )
            ).to.be.revertedWith("FPToken: Not authorized (Alith only)"); // Corrected revert message
            console.log("Non-Alith XP distribution correctly reverted.");
        });

        it("should revert if FPToken is transferred by a player", async function () {
            // First, give player1 some XP
            await fpToken.connect(alithOracleSigner).distributeRiftXP(
                await player1.getAddress(),
                await player2.getAddress(),
                await player3.getAddress()
            );

            const player1Balance = await fpToken.balanceOf(await player1.getAddress());
            expect(player1Balance).to.be.gt(0); // Player1 should have XP now

            // Try to transfer from player1 to player2
            console.log("Attempting to transfer FPToken (should revert)...");
            await expect(
                fpToken.connect(player1).transfer(await player2.getAddress(), ethers.parseEther("10"))
            ).to.be.revertedWith("FPToken: Transfers disabled (except for burning)");
            console.log("FPToken transfer by player correctly reverted.");

            // Verify player balances are unchanged (player1's balance remains, player2 got 30 XP as first extraction)
            expect(await fpToken.balanceOf(await player1.getAddress())).to.equal(player1Balance);
            // player2's balance should still be 30 after the initial distribution, not affected by the failed transfer
            expect(await fpToken.balanceOf(await player2.getAddress())).to.equal(ethers.parseEther("30"));
        });

        it("should allow Alith to burn XP", async function () {
            // First, give player1 some XP
            await fpToken.connect(alithOracleSigner).distributeRiftXP(
                await player1.getAddress(),
                await player2.getAddress(),
                await player3.getAddress()
            );

            const player1Balance = await fpToken.balanceOf(await player1.getAddress());
            expect(player1Balance).to.equal(ethers.parseEther("50")); // Winner XP

            // Alith burns some XP from player1
            const burnAmount = ethers.parseEther("10");
            console.log("Alith burning XP from player1...");
            await fpToken.connect(alithOracleSigner).burnSeasonXP(await player1.getAddress(), burnAmount);

            expect(await fpToken.balanceOf(await player1.getAddress())).to.equal(player1Balance - burnAmount);
            console.log("XP successfully burned by Alith.");
        });
    });

    describe("ClaimManager Functionality", function () {
        const testBadgeURI = "ipfs://QmbadgeURI123";

        it("should allow Alith to claim a badge for a player", async function () {
            // Give player1 some XP first
            await fpToken.connect(alithOracleSigner).distributeRiftXP(
                await player1.getAddress(),
                await player2.getAddress(),
                await player3.getAddress()
            );

            const player1XP = await fpToken.balanceOf(await player1.getAddress());
            const xpCost = ethers.parseEther("50");

            expect(player1XP).to.equal(xpCost); // Player1 got 50 XP as winner

            // Player1 hasn't claimed yet
            expect(await claimManager.claimed(await player1.getAddress(), await claimManager.currentSeason())).to.be.false;

            console.log("Alith attempting to claim badge for player1...");
            await claimManager.connect(alithOracleSigner).claimBadge(
                await player1.getAddress(),
                xpCost,
                nextTokenId, // Pass unique token ID
                testBadgeURI
            );

            // Verify XP was burned
            expect(await fpToken.balanceOf(await player1.getAddress())).to.equal(0);
            // Verify badge was minted (check balance of RankBadge for player1)
            expect(await rankBadge.balanceOf(await player1.getAddress())).to.equal(1);
            expect(await rankBadge.ownerOf(nextTokenId)).to.equal(await player1.getAddress()); // Check ownership of specific NFT
            // Verify player1 is marked as claimed for this season
            expect(await claimManager.claimed(await player1.getAddress(), await claimManager.currentSeason())).to.be.true;
            console.log("Badge claimed and XP burned successfully for player1.");
            nextTokenId++; // Increment for next test
        });

        it("should revert if a player tries to claim twice in the same season", async function () {
            // Give player1 some XP
            await fpToken.connect(alithOracleSigner).distributeRiftXP(
                await player1.getAddress(),
                await player2.getAddress(),
                await player3.getAddress()
            );
            const xpCost = ethers.parseEther("50");

            // First claim
            await claimManager.connect(alithOracleSigner).claimBadge(
                await player1.getAddress(),
                xpCost,
                nextTokenId, // Pass unique token ID
                testBadgeURI
            );
            nextTokenId++; // Increment for successful claim

            // Second claim attempt
            console.log("Attempting second badge claim for player1 (should revert)...");
            await expect(
                claimManager.connect(alithOracleSigner).claimBadge(
                    await player1.getAddress(),
                    xpCost,
                    nextTokenId, // Pass unique token ID
                    testBadgeURI
                )
            ).to.be.revertedWith("ClaimManager: Already claimed for this season");
            console.log("Second claim attempt correctly reverted.");
            nextTokenId++; // Increment regardless of revert, to keep unique IDs for subsequent tests
        });

        it("should revert if non-Alith tries to claim a badge", async function () {
            // Give player1 some XP
            await fpToken.connect(alithOracleSigner).distributeRiftXP(
                await player1.getAddress(),
                await player2.getAddress(),
                await player3.getAddress()
            );
            const xpCost = ethers.parseEther("50");

            console.log("Player1 attempting to claim badge (should revert)...");
            await expect(
                claimManager.connect(player1).claimBadge(
                    await player1.getAddress(),
                    xpCost,
                    nextTokenId, // Pass unique token ID
                    testBadgeURI
                )
            ).to.be.revertedWith("ClaimManager: Not Alith");
            console.log("Non-Alith badge claim correctly reverted.");
            nextTokenId++; // Increment regardless of revert, to keep unique IDs for subsequent tests
        });

        it("should allow owner to advance season", async function () {
            const initialSeason = await claimManager.currentSeason();
            console.log("Advancing season...");
            await claimManager.connect(deployer).newSeason();
            expect(await claimManager.currentSeason()).to.equal(initialSeason + 1n); // Use 1n for BigInt comparison
            console.log("Season advanced successfully.");
        });

        it("should revert if non-owner tries to advance season", async function () {
            console.log("Player1 attempting to advance season (should revert)...");
            await expect(
                claimManager.connect(player1).newSeason()
            ).to.be.revertedWithCustomError(claimManager, "OwnableUnauthorizedAccount"); // Corrected to use custom error
            console.log("Non-owner season advance correctly reverted.");
        });
    });
});