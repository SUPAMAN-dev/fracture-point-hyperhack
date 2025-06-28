// scripts/interact.ts

import { ethers } from "hardhat";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

let ALITH_ORACLE_FROM_ENV: string | undefined = process.env.ALITH_ORACLE;

if (!ALITH_ORACLE_FROM_ENV) {
    throw new Error("❌ ALITH_ORACLE environment variable is not set in .env.");
}

try {
    ALITH_ORACLE_FROM_ENV = ethers.getAddress(ALITH_ORACLE_FROM_ENV);
} catch (e: any) {
    throw new Error(`❌ ALITH_ORACLE "${ALITH_ORACLE_FROM_ENV}" from .env is not a valid Ethereum address: ${e.message}`);
}

async function main() {
    const addressesPath = './deployed_addresses.json';
    let deployedAddresses: { fpToken: string; rankBadge: string; claimManager: string };

    try {
        const data = fs.readFileSync(addressesPath, 'utf8');
        deployedAddresses = JSON.parse(data);
    } catch (error) {
        console.error(`❌ Error reading deployed_addresses.json. Please run 'npx hardhat run scripts/deploy.ts --network localhost' first.`);
        process.exit(1);
    }

    const FP_TOKEN_ADDRESS = deployedAddresses.fpToken;
    const CLAIM_MANAGER_ADDRESS = deployedAddresses.claimManager;
    const RANK_BADGE_ADDRESS = deployedAddresses.rankBadge;

    const [deployer] = await ethers.getSigners();
    const alithOracleSigner = await ethers.getSigner(ALITH_ORACLE_FROM_ENV);
    
    const player1Wallet = ethers.Wallet.createRandom();
    const player2Wallet = ethers.Wallet.createRandom();
    const player3Wallet = ethers.Wallet.createRandom();
    const player1Address = player1Wallet.address;
    const player2Address = player2Wallet.address;
    const player3Address = player3Wallet.address;

    console.log("🚀 Interacting with deployed contracts...");
    console.log(`      Deployer address: ${deployer.address}`);
    console.log(`      Alith Oracle address (from .env): ${alithOracleSigner.address}`);
    console.log(`      Test Player 1 (Winner) address: ${player1Address}`);
    console.log(`      Test Player 2 (First Extraction) address: ${player2Address}`);
    console.log(`      Test Player 3 (Second Extraction) address: ${player3Address}`);

    console.log(`DEBUG: FPToken Address: ${FP_TOKEN_ADDRESS}`);
    console.log(`DEBUG: ClaimManager Address: ${CLAIM_MANAGER_ADDRESS}`);
    console.log(`DEBUG: RankBadge Address: ${RANK_BADGE_ADDRESS}`);


    const fpToken = await ethers.getContractAt("FPToken", FP_TOKEN_ADDRESS);
    const claimManager = await ethers.getContractAt("ClaimManager", CLAIM_MANAGER_ADDRESS);
    const rankBadge = await ethers.getContractAt("RankBadge", RANK_BADGE_ADDRESS);

    console.log("\n--- Verification of Contract Connections ---");
    const fpTokenName = await fpToken.name();
    const fpTokenSymbol = await fpToken.symbol();
    const fpTokenAlith = await fpToken.alithOracle();
    const fpTokenClaimManager = await fpToken.claimManagerContract();
    console.log(`FPToken: Name=${fpTokenName}, Symbol=${fpTokenSymbol}, Alith=${fpTokenAlith}, ClaimManager=${fpTokenClaimManager}`);

    const claimManagerAlith = await claimManager.alithOracle();
    const claimManagerFPToken = await claimManager.fpToken();
    const claimManagerRankBadge = await claimManager.rankBadge();
    console.log(`ClaimManager: Alith=${claimManagerAlith}, FPToken=${claimManagerFPToken}, RankBadge=${claimManagerRankBadge}`);

    const rankBadgeOwner = await rankBadge.owner();
    console.log(`RankBadge: Owner=${rankBadgeOwner}`);

    if (fpTokenAlith.toLowerCase() !== alithOracleSigner.address.toLowerCase()) {
        console.error("❌ FPToken's Alith Oracle address mismatch!");
    }
    if (fpTokenClaimManager.toLowerCase() !== CLAIM_MANAGER_ADDRESS.toLowerCase()) {
        console.error("❌ FPToken's ClaimManager address mismatch!");
    }
    if (claimManagerAlith.toLowerCase() !== alithOracleSigner.address.toLowerCase()) {
        console.error("❌ ClaimManager's Alith Oracle address mismatch!");
    }
    if (rankBadgeOwner.toLowerCase() !== CLAIM_MANAGER_ADDRESS.toLowerCase()) {
        console.error("❌ RankBadge owner is not ClaimManager!");
    }

    console.log("\n--- XP Distribution Test ---");

    let player1InitialXP = await fpToken.balanceOf(player1Address);
    let player2InitialXP = await fpToken.balanceOf(player2Address);
    let player3InitialXP = await fpToken.balanceOf(player3Address);
    console.log(`Initial XP for Player1 (${player1Address}): ${ethers.formatEther(player1InitialXP)}`);
    console.log(`Initial XP for Player2 (${player2Address}): ${ethers.formatEther(player2InitialXP)}`);
    console.log(`Initial XP for Player3 (${player3Address}): ${ethers.formatEther(player3InitialXP)}`);

    console.log(`Distributing Rift XP via Alith Oracle (${alithOracleSigner.address})...`);
    const distributeTx = await fpToken.connect(alithOracleSigner).distributeRiftXP(
        player1Address,
        player2Address,
        player3Address
    );
    await distributeTx.wait();
    console.log("✅ Rift XP Distributed. Transaction hash:", distributeTx.hash);

    let player1XPAfterDist = await fpToken.balanceOf(player1Address);
    let player2XPAfterDist = await fpToken.balanceOf(player2Address);
    let player3XPAfterDist = await fpToken.balanceOf(player3Address);
    console.log(`XP for Player1 (Winner) after distribution: ${ethers.formatEther(player1XPAfterDist)} (Expected: 50 XP)`);
    console.log(`XP for Player2 (First Extraction) after distribution: ${ethers.formatEther(player2XPAfterDist)} (Expected: 30 XP)`);
    console.log(`XP for Player3 (Second Extraction) after distribution: ${ethers.formatEther(player3XPAfterDist)} (Expected: 20 XP)`);

    console.log("\n--- XP Burning Test (via ClaimManager) ---");

    const xpToBurn = ethers.parseEther("25");
    console.log(`Player1's XP before burn: ${ethers.formatEther(await fpToken.balanceOf(player1Address))}`);
    console.log(`Attempting to burn ${ethers.formatEther(xpToBurn)} XP from Player1 via Alith Oracle...`);

    const burnTx = await fpToken.connect(alithOracleSigner).burnSeasonXP(player1Address, xpToBurn);
    await burnTx.wait();
    console.log("✅ XP Burned. Transaction hash:", burnTx.hash);

    let player1XPAfterBurn = await fpToken.balanceOf(player1Address);
    console.log(`Player1's XP after burn: ${ethers.formatEther(player1XPAfterBurn)} (Expected: 25 XP)`);

    console.log("\n--- Badge Claim Test (via ClaimManager) ---");

    const badgeURI = "ipfs://QmbadgeURI123";
    const xpCostForBadge = ethers.parseEther("40");

    if (player1XPAfterBurn < xpCostForBadge) {
        console.log(`Player1 needs more XP to claim badge. Current: ${ethers.formatEther(player1XPAfterBurn)}, Needed: ${ethers.formatEther(xpCostForBadge)}`);
        // --- MODIFICATION: Pass valid addresses for the extra XP mint ---
        const mintMoreTx = await fpToken.connect(alithOracleSigner).distributeRiftXP(player1Address, player1Address, player1Address);
        await mintMoreTx.wait();
        console.log("Minted more XP for Player1 to enable badge claim (Player1 now has 25 + 100 = 125 XP)."); // Updated expected XP
        player1XPAfterBurn = await fpToken.balanceOf(player1Address);
    }

    console.log(`Player1's XP before badge claim: ${ethers.formatEther(player1XPAfterBurn)}`);
    console.log(`Attempting to claim badge for Player1 via ClaimManager (connected as Alith Oracle)...`);

    const claimBadgeTx = await claimManager.connect(alithOracleSigner).claimBadge(
        player1Address,
        xpCostForBadge,
        badgeURI
    );
    await claimBadgeTx.wait();
    console.log("✅ Badge Claimed. Transaction hash:", claimBadgeTx.hash);

    let player1XPAfterBadgeClaim = await fpToken.balanceOf(player1Address);
    console.log(`Player1's XP after badge claim: ${ethers.formatEther(player1XPAfterBadgeClaim)} (Expected: 85 XP, if started with 125 and burned 40)`); // Updated expectation

    const badgeCount = await rankBadge.balanceOf(player1Address);
    console.log(`Player1 owns ${badgeCount} RankBadge(s).`);
    if (badgeCount > 0) {
        try {
            const tokenId = await rankBadge.tokenOfOwnerByIndex(player1Address, 0);
            const tokenURI = await rankBadge.tokenURI(tokenId);
            console.log(`Player1's first badge Token ID: ${tokenId}, URI: ${tokenURI}`);
        } catch (e) {
            console.warn("Could not retrieve token URI by index (player might own no badges yet or index is out of bounds).");
        }
    }
    console.log("\n✅ All interaction tests completed successfully on Hyperion Testnet.");
}

main().catch((error) => {
    console.error("❌ Interaction error:", error);
    process.exitCode = 1;
});