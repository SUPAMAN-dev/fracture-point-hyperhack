import { ethers, network } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("👤 Deployer:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("💰 Balance:", ethers.formatEther(balance), "tMETIS");

  // Replace these addresses with real deployed contract addresses if needed
  const fpToken = await ethers.getContractAt("FPToken", "0xAB37a878BD25dac76e0B172Da4F28e7909Cf8974");
  const rankBadge = await ethers.getContractAt("RankBadge", "0xAB37a878BD25dac76e0B172Da4F28e7909Cf8974");
  const claimManager = await ethers.getContractAt("ClaimManager", "0xAB37a878BD25dac76e0B172Da4F28e7909Cf8974");

  console.log("📛 Token name:", await fpToken.name());
  console.log("🏷️ Token symbol:", await fpToken.symbol());
  console.log("👑 FPToken owner:", await fpToken.owner());

  const isMinter = await fpToken.isMinter(deployer.address);
  console.log("🔐 Is deployer authorized minter?", isMinter);
}

main().catch((error) => {
  console.error("❌ Script error:", error);
  process.exitCode = 1;
});
