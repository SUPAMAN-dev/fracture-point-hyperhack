# Fracture Point Badge Logic Explainer

## 🎖️ Overview

Fracture Point uses a unique badge system to rank and reward players based on skill and contribution. This system introduces **non-transferable rank badges** (as NFTs) that act as proof of participation, effort, and eligibility for \$GHC claims.

These badges are earned based on FPToken (XP) accumulated during a season and are minted at the end of each season. They play a dual role: rewarding top players and serving as a burn mechanism for XP.

---

## 🔁 How It Works

### Step 1: Earn FPToken

Players earn FPToken (in-game XP) through ranked matches, quests, and other gameplay activities.

### Step 2: Alith Evaluates Rankings

At season end, Alith calculates player rankings based on total FPToken earned.

### Step 3: Rank Cut-Offs Are Locked

Only players who cross specific XP thresholds (relative to others) are eligible for badge minting. Others retain their XP.

### Step 4: Minting the Rank Badge NFT

Players mint their badge NFT by paying the exact FPToken value they earned that season (burned). This proves they earned their place and locks supply.

### Step 5: Use Badge to Claim \$GHC

Badges act as certificates for Proof of Play. Only players holding a badge can initiate a claim request (via ClaimManager) to receive \$GHC (monetary reward) on GameHouse.

---

## 🧱 Rank Structure

* **Rookie** – Entry-level rank.
* **Veteran** – Beginner milestone.
* **Elite** – Above average.
* **Pro** – Skilled and consistent.
* **Master** – Advanced competition tier.
* **Grand Master** – High-skill elite.
* **Ultimate** – Reserved for top 1%.
* **Legendary** – Top 10 or Top 5 overall.

Each of these ranks has a corresponding NFT with metadata for:

* Season ID
* FPToken used to mint
* Player address (non-transferable)

---

## 🔥 Burn and Scarcity

* Only players who burn their FPToken can mint a badge.
* Badge is single-season, single-player use.
* If you don’t qualify, you retain your FPToken for upgrades, future attempts, or cosmetics.

---

## 🏆 Why This Matters

* It creates scarcity and merit-based achievement.
* GHC supply is protected by ensuring only top contributors earn it.
* Non-winners don’t feel cheated they still hold XP for future utility.

---

## ✅ Future Utility of Badges

* Entry into elite tournaments
* Eligibility for faction leadership
* Voting rights on seasonal story arcs
* Enhanced social status in GameHouse ecosystem
