import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const addr = (process.env.CONTRACT || "").trim();
if (!addr) throw new Error("Set CONTRACT env var to deployed address");

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet   = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const abi = [
  "function setInputsPlain(uint32 _a, uint32 _b) external",
  "function splitForA() returns (bytes)",
  "function splitForB() returns (bytes)"
];

async function main() {
  console.log("Calling SplitPay on:", addr);
  const c = new ethers.Contract(addr, abi, wallet);

  const tx = await c.setInputsPlain(5000, 3000);
  const rc = await tx.wait();
  console.log("setInputsPlain tx:", rc.hash);

  // FORCE read-only calls even if the contract marks them non-view
  const aCtxt = await c.splitForA.staticCall();
  const bCtxt = await c.splitForB.staticCall();

  console.log("Encrypted splitForA:", aCtxt);
  console.log("Encrypted splitForB:", bCtxt);

  // Optional: decode to show they represent 4800 / 3200
  const coder = ethers.AbiCoder.defaultAbiCoder();
  const [aPlain] = coder.decode(["uint32"], aCtxt);
  const [bPlain] = coder.decode(["uint32"], bCtxt);
  console.log("Decoded (for demo):", Number(aPlain), Number(bPlain));
}

main().catch((e)=>{ console.error(e); process.exit(1); });
