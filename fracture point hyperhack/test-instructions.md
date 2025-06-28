# Fracture Point - Community Test Tasks (Hyperion Testnet)

Welcome to the official community testing for **Fracture Point**, a Web3 extraction shooter powered by the GHC Proof-of-Play economy. This testnet campaign helps us validate core mechanics, XP tracking, and Alith integration.

---

## ✅ Wallet Setup

Make sure you're on the **Hyperion Testnet**  
🔗 RPC: `https://hyperion-testnet.metisdevops.link`  
🧪 Chain ID: `133717`  
🪙 Token Symbol: `tMETIS`

---

## 📌 Tasks for Testers

### 1. Earn XP (FPToken)

- **Action:** Complete a game session using the test client (stub or frontend not required — we will simulate mint).
- **Expected Result:** You should receive `FPToken` to your wallet.
- **Alith Checks:** Wallet must hold >0 FPToken.

---

### 2. Reach Rank Badge

- **Action:** Burn FPToken to mint a rank badge NFT.
- **Expected Result:** Receive `RankBadge` NFT matching your XP (Rookie, Veteran, etc.).
- **Alith Checks:** Wallet must hold 1 valid RankBadge NFT.
- **Bonus:** Test if mint price matches expected XP cost.

---

### 3. Link Social Proof

- **Action:** Use Alith to complete a task like:
  - Follow [@I_AM_ADEYEMIE](https://x.com/I_AM_ADEYEMIE) on X
  - Join Fracture Point Discord
- **Expected Result:** Alith confirms social proof.
- **Alith Checks:** Valid social task match per wallet.

---

### 4. Claim GHC (Mocked)

- **Action:** Use RankBadge as proof to simulate a GHC claim.
- **Expected Result:** Alith approves or rejects based on badge tier.
- **Alith Checks:** Badge must be Ultimate or higher.

---

##  Stress Test Instructions (Optional)

- Deploy 10+ wallets and mint/burn FP rapidly.
- Watch for gas issues, claim edge cases, or broken mint flow.
- Report anything to [SUPAMAN-dev](https://github.com/SUPAMAN-dev) or via the HyperHack forum thread.

---

## ✅ Dev Contact

**Project Lead:** Adeyemi "SUPAMAN"  
Telegram: `@SUPAMANLJ`  
GitHub: [github.com/SUPAMAN-dev](https://github.com/SUPAMAN-dev)

---

_Thank you for helping us battle-test the future of skill-based game economies._

