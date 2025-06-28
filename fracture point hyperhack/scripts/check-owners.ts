import { ethers } from "hardhat";

async function main() {
  const fp = await ethers.getContractAt("FPToken", "0x64A62B3dc77801d1697554D6a57c9bd4c8a5f775");
  const cm = await ethers.getContractAt("ClaimManager", "0x23E45F48C78b1Da466f65753934916E121251216");
  const [signer] = await ethers.getSigners();

  console.log("Signer          :", signer.address);
  console.log("FPToken.owner   :", await fp.owner());
  console.log("ClaimMgr.owner  :", await cm.owner());
}

main().catch(console.error);
