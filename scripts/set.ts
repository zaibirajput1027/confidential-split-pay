import hre from "hardhat";

async function main() {
  const addr = process.env.CONTRACT as string;
  if (!addr) throw new Error("Set CONTRACT env var to your deployed address");

  const a = (process.env.A || "0x112233") as `0x${string}`;
  const b = (process.env.B || "0xaabbcc") as `0x${string}`;

  const c = await hre.ethers.getContractAt("CipherLocker", addr);
  const tx = await c.set(a, b);
  const r = await tx.wait();
  console.log("Stored. Tx:", r?.hash);
}

main().catch((e) => { console.error(e); process.exit(1); });
