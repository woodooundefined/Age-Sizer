import { ethers } from "hardhat";

async function main() {
  console.log("Deploying AgeSizer contract...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  const AgeSizer = await ethers.getContractFactory("AgeSizer");
  const ageSizer = await AgeSizer.deploy();

  await ageSizer.waitForDeployment();

  const address = await ageSizer.getAddress();
  console.log("AgeSizer deployed to:", address);

  console.log("\n=== DEPLOYMENT COMPLETE ===");
  console.log("Contract Address:", address);
  console.log("\nNext steps:");
  console.log("1. Update CONTRACT_ADDRESS in frontend/lib/constants.ts");
  console.log(`2. Verify contract: npx hardhat verify --network sepolia ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

