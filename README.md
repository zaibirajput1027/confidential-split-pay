# 🧠 Seeing Privacy On-Chain: Zama’s FHE Explained in One Look

## 🧩 Overview
This repo demonstrates **Zama’s Fully Homomorphic Encryption (FHE)** concept using a mock setup on **Sepolia Testnet**.  
We deployed two contracts:
- **Plain (Normal EVM):** Data is visible to everyone.  
- **Mock-FHE (Confidential Split Pay):** Data appears encrypted on-chain.

🧾 This is an educational demo — not real encryption — to show what on-chain privacy will look like once **Zama’s fhEVM** launches.

---

## ⚙️ Live Contracts on Sepolia
| Type | Contract | Description |
|------|-----------|-------------|
| Plain | [`0xD753ED023C8caB4ac50C9A837FDC4dE4424De58d`](https://sepolia.etherscan.io/address/0xD753ED023C8caB4ac50C9A837FDC4dE4424De58d) | Public data visible via `getA` / `getB` |
| Mock-FHE | [`0xA901eBd83149470810108973c58e6942753C9De2`](https://sepolia.etherscan.io/address/0xA901eBd83149470810108973c58e6942753C9De2) | Returns encrypted-looking bytes (`0x000…12c0`) |

---

## 💡 What This Shows
| Normal EVM | Mock FHE (Zama style) |
|-------------|------------------------|
| Anyone can read contract values. | Data looks opaque — only decryptable by the key holder (in real fhEVM). |
| Transparency, zero privacy. | Computation privacy — logic is public, data isn’t. |

🧠 In this mock version, values are still readable if you know the key.  
When fhEVM goes live, these values will be **mathematically unreadable** to everyone, even the deployer.

---

## 🚀 Run Locally

### Prerequisites
- Node.js (v18+)  
- Hardhat  
- Git  

### Setup
```bash
git clone https://github.com/zaibirajput1027/confidential-split-pay.git
cd confidential-split-pay
npm install
npx hardhat compile
