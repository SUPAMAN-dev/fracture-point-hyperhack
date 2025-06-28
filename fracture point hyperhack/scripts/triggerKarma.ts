import { ethers } from "hardhat";

async function main() {
    // --- Configuration ---
    // REPLACE WITH THE ACTUAL DEPLOYED ADDRESS OF YOUR CLAIMMANAGER CONTRACT
    // You would have gotten this during your Hardhat deployment, or from a deployment JSON.
    // It's often found in a file like 'artifacts/contracts/ClaimManager.json' or a 'deployments' folder.
    const CLAIM_MANAGER_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // e.g., "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0" (Check your deploy output!)

    // Sample data for the function call
    const playerDataUrl: string = "https://example.com/player/data/john_doe";
    // For bytes32, we can hash the string or use a predefined 32-byte hex string.
    // Using keccak256 (SHA3) of the URL is a common practice for data integrity.
    const playerDataHash: string = ethers.keccak256(ethers.toUtf8Bytes(playerDataUrl));
    // Alternatively, a simple 32-byte hex string (ensure it's 64 characters long, prefixed with 0x)
    // const playerDataHash: string = "0x112233445566778899aabbccddeeff00112233445566778899aabbccddeeff00";


    // --- Script Logic ---
    console.log("Attempting to call requestKarmaEvaluation on ClaimManager...");

    // Get the Signer (your default Hardhat account #0)
    const [deployer] = await ethers.getSigners();
    console.log("Using account:", deployer.address);

    // Get the ClaimManager contract instance
    const ClaimManager = await ethers.getContractFactory("ClaimManager");
    const claimManager = ClaimManager.attach(CLAIM_MANAGER_ADDRESS); // Use attach for deployed contracts

    // Call the function
    const tx = await claimManager.requestKarmaEvaluation(playerDataUrl, playerDataHash);
    console.log("Transaction sent. Hash:", tx.hash);

    // Wait for the transaction to be mined
    await tx.wait();
    console.log("Transaction confirmed!");
    console.log("KarmaEvaluationRequested event should have been emitted.");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
