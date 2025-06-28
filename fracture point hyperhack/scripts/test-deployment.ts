import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("👤 Using deployer:", deployer.address);
 const balance = await ethers.provider.getBalance(deployer.address);
 console.log("💰 Balance:", ethers.utils.formatEther(balance), "tMETIS");

  // Replace these with your actual deployed addresses
  const fpTokenAddress = "0xAB37a878BD25dac76e0B172Da4F28e7909Cf8974"; // put your actual address here
  const rankBadgeAddress = "0xAB37a878BD25dac76e0B172Da4F28e7909Cf8974"; // put your actual address here
  const claimManagerAddress = "0xAB37a878BD25dac76e0B172Da4F28e7909Cf8974"; // put your actual address here

  const FPToken = await ethers.getContractAt("FPToken", fpTokenAddress);
  const RankBadge = await ethers.getContractAt("RankBadge", rankBadgeAddress);
  const ClaimManager = await ethers.getContractAt("ClaimManager", claimManagerAddress);

  console.log("🧪 FPToken name:", await FPToken.name());
  console.log("🏅 RankBadge name:", await RankBadge.name());
  console.log("🎯 ClaimManager linked FPToken:", await ClaimManager.fpToken());
}

main().catch((error) => {
  console.error("❌ Error in test script:", error);
  process.exit(1);
});
