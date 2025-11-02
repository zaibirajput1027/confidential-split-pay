import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Read compiled artifact (ABI + bytecode)
const artifact = JSON.parse(
  fs.readFileSync("./artifacts/contracts/CipherLocker.sol/CipherLocker.json", "utf8")
);

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function main() {
  console.log("Deploying CipherLocker with raw Ethers...");
  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
  const contract = await factory.deploy();
  await contract.waitForDeployment();
  console.log("CipherLocker deployed at:", await contract.getAddress());
}

main().catch((e) => { console.error(e); process.exit(1); });
