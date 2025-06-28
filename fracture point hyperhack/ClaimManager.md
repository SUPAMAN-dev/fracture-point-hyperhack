# 📜 ClaimManager Contract Overview (Fracture Point)

The `ClaimManager.sol` smart contract is a core part of the **Fracture Point on-chain reward system**, linking gameplay performance with economic rewards in a fair, verifiable, and burn-based process.

---

## 🔍 Purpose

`ClaimManager` serves as the **verification and distribution authority** for XP (FPToken) conversion and RankBadge eligibility. It is NOT responsible for minting GHC, but is used to validate who deserves it based on proof-of-play and leaderboard status.

---

## 🎯 Core Functions

### ✅ 1. Burn FPToken for RankBadge

* Verifies the player has enough XP.
* Burns the FPToken (via `FPToken.sol`).
* Enables minting of a RankBadge NFT (via `RankBadge.sol`).

### ✅ 2. Register/Validate Player Claim

* Associates a player’s wallet with a successful claim.
* Emits a `Claimed` event used by off-chain systems (like Alith or backend scripts) to approve GHC redemption.

### ✅ 3. Enforce Claim Logic

* Can be gated by season ID, minimum rank, snapshot proof, etc.
* Prevents duplicate or unauthorized badge claims.

---

## 🧠 Design Philosophy

The `ClaimManager` contract is:

* 🔒 **Non-inflationary**: It burns XP tokens as part of every valid claim.
* 📜 **Provable**: It emits logs and stores status on-chain for audit and indexing.
* 🧩 **Composable**: It connects to FPToken, RankBadge, and eventually an off-chain or L2-based GHC faucet.

---

## 🧩 Contract Interactions

* `FPToken.sol`: Burn XP from wallet.
* `RankBadge.sol`: Mint NFT for rank.
* `Alith / Backend`: Read `Claimed` events for off-chain or GHC claim eligibility.

---

## 🚫 What It Does NOT Do

* ❌ Does NOT mint GHC directly.
* ❌ Does NOT control supply of badges or XP.
* ❌ Does NOT calculate leaderboard position (Alith or backend provides that).

---

## 🔄 Example Flow

1. Player finishes the season with 1200 XP.
2. Backend calculates they are in the "Master" rank tier.
3. Player calls `claim()` on ClaimManager:

   * It checks they haven’t claimed already.
   * It burns 1000 FPToken (for that tier).
   * It mints a `Master` badge to their wallet.
4. ClaimManager emits `Claimed` event.
5. Alith reads this and triggers optional GHC disbursement.

---

## 📌 Future Add-ons

* ✅ Season locking logic
* ✅ Badge expiration windows
* ✅ Allowlist/snapshot-based preclaiming
* ✅ Off-chain claim verification gateway (GHC distribution UI)

---

## 💡 Why This Matters

By separating XP accumulation, badge minting, and GHC disbursement, Fracture Point creates a balanced and modular reward system. This ensures that gameplay — not hype — remains the core engine of the game economy.

---

🛠️ Maintained by: [SUPAMAN-dev](https://github.com/SUPAMAN-dev)

---

Want to contribute or integrate? Fork the repo or drop an issue.
