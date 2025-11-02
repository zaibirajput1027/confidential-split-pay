import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const run = async () => {
  const bn = await provider.getBlockNumber();
  console.log("Connected. Block #:", bn);
};
run().catch((e)=>{ console.error(e); process.exit(1); });
