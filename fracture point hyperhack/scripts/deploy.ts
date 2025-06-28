// scripts/deploy.ts

import { ethers } from "hardhat";
import dotenv from "dotenv";
import fs from "fs"; // <-- NEW: Import file system module
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
    const [deployer] = await ethers.getSigners();
    console.log("🚀 Deploying contracts with account:", deployer.address);
    console.log("DEBUG JS: Alith Oracle Address (from .env) being used:", ALITH_ORACLE_FROM_ENV);

    // Store deployed addresses here
    const deployedAddresses: { [key: string]: string } = {};

    // 1. Deploy FPToken
    const FPToken = await ethers.getContractFactory("FPToken");
    const fpToken = await FPToken.deploy(
        deployer.address,
        ALITH_ORACLE_FROM_ENV
    );
    await fpToken.waitForDeployment();
    const fpTokenAddress = await fpToken.getAddress();
    deployedAddresses.fpToken = fpTokenAddress; // Store address
    console.log("✅ FPToken deployed to:", fpTokenAddress);
    const currentFpTokenAlith = await fpToken.alithOracle();
    console.log(`      FPToken's current Alith Oracle (from constructor): ${currentFpTokenAlith}`);

    // 2. Deploy RankBadge
    const RankBadge = await ethers.getContractFactory("RankBadge");
    const rankBadge = await RankBadge.deploy();
    await rankBadge.waitForDeployment();
    const rankBadgeAddress = await rankBadge.getAddress();
    deployedAddresses.rankBadge = rankBadgeAddress; // Store address
    console.log("✅ RankBadge deployed to:", rankBadgeAddress);

    // 3. Deploy ClaimManager
    const ClaimManager = await ethers.getContractFactory("ClaimManager");
    const claimManager = await ClaimManager.deploy(
        deployer.address,
        fpTokenAddress,
        rankBadgeAddress,
        ALITH_ORACLE_FROM_ENV
    );
    await claimManager.waitForDeployment();
    const claimManagerAddress = await claimManager.getAddress();
    deployedAddresses.claimManager = claimManagerAddress; // Store address
    console.log("✅ ClaimManager deployed to:", claimManagerAddress);
    const currentClaimManagerAlith = await claimManager.alithOracle();
    console.log(`      ClaimManager's current Alith Oracle (from constructor): ${currentClaimManagerAlith}`);


    // --- CRITICAL STEP: Set ClaimManager address on RankBadge ---
    console.log("\nAttempting to set ClaimManager address in RankBadge (by deployer)...");
    try {
        const setClaimManagerOnRankBadgeTx = await rankBadge.connect(deployer).setClaimManagerContract(claimManagerAddress);
        await setClaimManagerOnRankBadgeTx.wait();
        console.log(`✅ ClaimManager address (${claimManagerAddress}) set on RankBadge.`);
        const currentRankBadgeClaimManager = await rankBadge.claimManagerContract();
        console.log(`      Confirmed RankBadge's internal ClaimManager address: ${currentRankBadgeClaimManager}`);
    } catch (error: any) {
        console.error("❌ Error setting ClaimManager on RankBadge:", error.message || error);
        throw error;
    }

    // --- IMPORTANT STEP: Transfer RankBadge ownership to ClaimManager ---
    console.log("\nInitiating transfer of RankBadge ownership to ClaimManager...");
    try {
        const tx = await rankBadge.connect(deployer).transferOwnership(claimManagerAddress);
        await tx.wait();
        console.log(`✅ RankBadge ownership transferred to ClaimManager (${claimManagerAddress}).`);
        const newRankBadgeOwner = await rankBadge.owner();
        console.log(`      Confirmed new RankBadge owner: ${newRankBadgeOwner}`);
    } catch (error: any) {
        console.error("❌ Error transferring RankBadge ownership:", error.message || error);
        throw error;
    }

    // --- CRITICAL STEP: Set ClaimManager address on FPToken ---
    console.log("\nAttempting to set ClaimManager address on FPToken...");
    try {
        const txSetClaimManager = await fpToken.connect(deployer).setClaimManagerContract(claimManagerAddress);
        await txSetClaimManager.wait();
        console.log("✅ ClaimManager address set on FPToken.");
        const currentFpTokenClaimManager = await fpToken.claimManagerContract();
        console.log(`      FPToken's current ClaimManager Contract: ${currentFpTokenClaimManager}`);
    } catch (error: any) {
        console.error("❌ Error setting ClaimManager on FPToken:", error.message || error);
        throw error;
    }

    console.log("\n✅ All contracts deployed and configured.");
    console.log("Final Alith oracle address used:", ALITH_ORACLE_FROM_ENV);

    // --- NEW: Save deployed addresses to a file ---
    const addressesPath = './deployed_addresses.json';
    fs.writeFileSync(addressesPath, JSON.stringify(deployedAddresses, null, 2));
    console.log(`🚀 Deployed addresses saved to ${addressesPath}`);
}

main().catch((error) => {
    console.error("❌ Deployment/Configuration error:", error);
    process.exitCode = 1;
});