import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const art = JSON.parse(
  fs.readFileSync("./artifacts/contracts/ConfidentialSplitPay.sol/ConfidentialSplitPay.json","utf8")
);

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet   = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function main(){
  console.log("Deploying ConfidentialSplitPay...");
  const factory = new ethers.ContractFactory(art.abi, art.bytecode, wallet);
  const c = await factory.deploy();
  await c.waitForDeployment();
  console.log("ConfidentialSplitPay deployed at:", await c.getAddress());
}
main().catch(e=>{console.error(e);process.exit(1);});
