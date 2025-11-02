import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const addr = process.env.CONTRACT; // from env variable
if (!addr) throw new Error("Set CONTRACT env var to your deployed address");

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// minimal ABI
const abi = [
  "function set(bytes a, bytes b) external",
  "function getA() view returns (bytes)",
  "function getB() view returns (bytes)"
];

async function main() {
  console.log("Writing data to contract:", addr);
  const c = new ethers.Contract(addr, abi, wallet);
  const tx = await c.set("0x112233", "0xaabbcc"); // fake encrypted data
  const rc = await tx.wait();
  console.log("Stored. Tx:", rc.hash);

  const a = await c.getA();
  const b = await c.getB();
  console.log("getA:", a);
  console.log("getB:", b);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
