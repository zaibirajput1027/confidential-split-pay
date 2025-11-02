import hre from "hardhat";

async function main() {
  console.log("Starting deploy…");
  const C = await hre.ethers.getContractFactory("CipherLocker");
  const c = await C.deploy();
  await c.waitForDeployment();
  console.log("CipherLocker deployed at:", await c.getAddress());
}

main().catch((e) => { console.error(e); process.exit(1); });
