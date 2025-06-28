# Fracture Point – Hyperion Testnet Build (HyperHack Edition)

> A next-gen extraction shooter powered by Alith, built for the Hyperion testnet and the future of community-driven Web3 games.

Fracture Point is a fast-paced, skill-based extraction shooter where gameplay is the only proof that matters. Built on the Hyperion testnet and integrated with **Alith**, Fracture Point introduces a **Proof-of-Play + Reputation System** that rewards real in-game contributions — not token speculation.

---

## 🌐 Overview
Fracture Point introduces a two-token model:

- **FPToken (Fracture Points)**: Native XP system to track player actions and progress. Non-transferable, earned through gameplay, social quests, and faction participation.
- **GHC (GameHouse Coin)**: External, fixed-supply token with monetary value. Claimable via Alith-verified milestones, social reputation, and NFT badge rankings.

---

## 🔁 Reward Flow
1. Players earn **FPToken** via battles, ranked matches, and community quests.
2. Alith aggregates and ranks players weekly → issues **on-chain badges** (NFTs).
3. Only badge-holders can claim **GHC** based on FP burned.

This structure ensures:
- Proof-of-Play integrity
- Sustainable token economy
- Deep integration of AI verification + player-driven governance

---

## 🔩 Contracts in This Repo
- `FPToken.sol` – In-game XP token (non-transferable, burnable for badges)
- `RankBadge.sol` – NFT certificate issued to top players weekly via Alith ranking
- `ClaimManager.sol` – Alith-controlled GHC disbursement trigger for qualified players

> These smart contracts are modular and will evolve to support other GameHouse projects (e.g., MOBAs, racing games).

---

## 🚀 Local Setup (for Hyperion Testnet)
```bash
git clone https://github.com/SUPAMAN-dev/fracture-point-hyperhack.git
cd fracture-point-hyperhack
npm install
```
Create a `.env` file:
```env
PRIVATE_KEY=0xYourPrivateKeyHere
```
---

## 📦 Technologies Used
- **Hardhat + TypeScript** – Solidity dev stack
- **OpenZeppelin Contracts v5** – Secure standards
- **Hyperion Testnet** – Parallel execution, Alith-native AI infra
- **Alith AI** – Used to rank, badge, and verify claim eligibility

---

## 🧠 Future Vision
Fracture Point is the first in a series of Alith-powered, creator-governed games. With each match, players build:
- **Skill-based reputation**
- **Ownership of their rank**
- **Access to GHC as Proof of Play**

GHC is the Bitcoin to FP’s Proof-of-Work — scarce, earned, and non-inflationary.

---

## 📜 License
MIT – Built under the public-good vision of community-led gaming economies.

---

## 🙌 Built With Support From
- Hyperion Hackathon team
- The Alith AI ecosystem
- GameHouse Labs (Founding game studio)
- GrantDAO & Metis L2 Community

> Built by [Adesegun Adeyemi](https://x.com/I_AM_ADEYEMIE) (SUPAMANLJ)


---

Let’s show what Proof of Play truly means.
