document.addEventListener("DOMContentLoaded", () => {
  const splashScreen = document.getElementById("splash-screen");
  const loadingBarFill = document.querySelector(".loading-bar-fill");
  const loadingText = document.querySelector(".loading-text");
  const splashStartBtn = document.getElementById("splash-start-btn");
  const splashConnectWalletBtn = document.getElementById(
    "splash-connect-wallet-btn"
  );
  const mainLobbyContainer = document.getElementById("main-lobby-container");

  const menuItems = document.querySelectorAll(".left-menu .menu-item");
  const backButtons = document.querySelectorAll(".back-btn");
  const screenViews = document.querySelectorAll(".screen-view");
  const preMatchLobby = document.getElementById("pre-match-lobby");

  const walletConnectBtns = document.querySelectorAll(".wallet-connect-btn");
  const walletModalOverlay = document.getElementById("wallet-modal-overlay");
  const modalCloseBtn = document.querySelector(".modal-close-btn");
  const metamaskConnectBtn = document.getElementById("metamask-connect");
  const walletconnectConnectBtn = document.getElementById(
    "walletconnect-connect"
  );
  const walletConnectionOptions = document.getElementById(
    "wallet-connection-options"
  );
  const walletDetails = document.getElementById("wallet-details");
  const walletAddressSpan = document.getElementById("wallet-address");
  const ghcBalanceSpan = document.getElementById("ghc-balance");
  const nftCountSpan = document.getElementById("nft-count");
  const walletDisconnectBtn = document.getElementById("wallet-disconnect-btn");
  const walletTabBtns = document.querySelectorAll(".wallet-tab-btn");
  const walletTabContents = document.querySelectorAll(".wallet-tab-content");
  const mintXpBtn = document.getElementById("mint-xp-btn");

  const CONTRACT_ADDRESSES = {
    fpToken: "0xb4F4337A5660f42bC4D7fB735F18aB7b47E3CAf9",
    rankBadge: "0xd557697c5C017d6Fdd76F778C1e2355AE3CCe15e",
    claimManager: "0xCc3B21510ef143F4b52f5e759C097c698F838e00",
  };
  const FP_TOKEN_ABI = [
    {
      inputs: [
        {
          internalType: "address",
          name: "initialOwner",
          type: "address",
        },
        {
          internalType: "address",
          name: "_alithOracle",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_winner",
          type: "address",
        },
        {
          internalType: "address",
          name: "_firstExtraction",
          type: "address",
        },
        {
          internalType: "address",
          name: "_secondExtraction",
          type: "address",
        },
      ],
      name: "distributeRiftXP",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  let provider;
  let signer;
  let fpTokenContract;
  let connectedAddress = null;

  function handleWalletConnectedTransition() {
    if (splashScreen.style.display !== "none") {
      splashScreen.style.display = "none";
      mainLobbyContainer.style.display = "grid";
      console.log("Auto-transitioned to main lobby after wallet connection");
    }
  }
  async function initializeWeb3() {
    try {
      console.log("Checking for MetaMask...");
      console.log("window.ethereum:", window.ethereum);
      console.log("typeof window.ethereum:", typeof window.ethereum);

      if (typeof window.ethereum !== "undefined" && window.ethereum) {
        console.log("MetaMask detected, initializing provider...");

        provider = new ethers.providers.Web3Provider(window.ethereum);

        fpTokenContract = new ethers.Contract(
          CONTRACT_ADDRESSES.fpToken,
          FP_TOKEN_ABI,
          provider
        );

        console.log("Web3 initialized successfully");
        return true;
      } else {
        console.error("MetaMask is not installed or not detected");
        console.log(
          "Available window properties:",
          Object.keys(window).filter((key) => key.includes("ethereum"))
        );
        return false;
      }
    } catch (error) {
      console.error("Error initializing Web3:", error);
      return false;
    }
  }

  async function connectMetaMask() {
    try {
      console.log("Starting MetaMask connection...");
      console.log("Current provider state:", provider);

      if (!provider) {
        console.log("Initializing Web3 provider...");
        const initialized = await initializeWeb3();
        if (!initialized) {
          alert(
            "MetaMask is not installed. Please install MetaMask to connect."
          );
          return false;
        }
      }

      console.log("Requesting account access...");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected accounts:", accounts);

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found");
      }

      signer = provider.getSigner();
      connectedAddress = await signer.getAddress();
      console.log("Connected address:", connectedAddress);

      walletAddressSpan.textContent = `${connectedAddress.substring(
        0,
        6
      )}...${connectedAddress.substring(connectedAddress.length - 4)}`;

      try {
        console.log("Fetching token balance...");
        const balance = await fpTokenContract.balanceOf(connectedAddress);
        const balanceInEther = ethers.utils.formatEther(balance);
        console.log("Token balance:", balanceInEther);

        ghcBalanceSpan.textContent = `${parseFloat(balanceInEther).toFixed(
          2
        )} FP`;
        nftCountSpan.textContent = "0 NFTs";

        walletConnectionOptions.style.display = "none";
        walletDetails.style.display = "block";
        walletDisconnectBtn.style.display = "block";
        mintXpBtn.style.display = "block";

        console.log("MetaMask connected successfully");
        
        handleWalletConnectedTransition();
        
        return true;
      } catch (balanceError) {
        console.error("Error fetching balance:", balanceError);
        ghcBalanceSpan.textContent =
          "0 FP (Contract not found on this network)";
        nftCountSpan.textContent = "0 NFTs";

        walletConnectionOptions.style.display = "none";
        walletDetails.style.display = "block";
        walletDisconnectBtn.style.display = "block";
        mintXpBtn.style.display = "block";

        console.log(
          "MetaMask connected but balance fetch failed - likely wrong network"
        );
        
        handleWalletConnectedTransition();
        
        return true;
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);

      if (error.code === 4001) {
        alert(
          "Connection rejected by user. Please try again and approve the connection."
        );
      } else if (error.message.includes("No accounts found")) {
        alert("No accounts found. Please unlock MetaMask and try again.");
      } else if (error.message.includes("network")) {
        alert("Network error. Please check your MetaMask network settings.");
      } else {
        alert(`Failed to connect wallet: ${error.message}`);
      }
      return false;
    }
  }

  async function mintXPTokens() {
    if (!signer || !connectedAddress) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      const fpTokenWithSigner = fpTokenContract.connect(signer);

      const tx = await fpTokenWithSigner.distributeRiftXP(
        connectedAddress,
        connectedAddress,
        connectedAddress
      );

      console.log("Transaction sent:", tx.hash);

      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);

      const newBalance = await fpTokenContract.balanceOf(connectedAddress);
      const balanceInEther = ethers.utils.formatEther(newBalance);
      ghcBalanceSpan.textContent = `${parseFloat(balanceInEther).toFixed(
        2
      )} FP`;

      alert(
        "XP tokens minted successfully! Check your wallet for the transaction."
      );
    } catch (error) {
      console.error("Error minting XP tokens:", error);
      alert(
        "Failed to mint XP tokens. Make sure you have enough gas and the transaction is authorized."
      );
    }
  }

  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    loadingBarFill.style.width = `${progress}%`;
    if (progress === 100) {
      loadingText.textContent = "Connection successful!";
      clearInterval(interval);
      setTimeout(() => {
        splashStartBtn.style.display = "block";
        splashConnectWalletBtn.style.display = "block";
      }, 500);
    }
  }, 200);

  splashStartBtn.addEventListener("click", () => {
    splashScreen.style.display = "none";
    mainLobbyContainer.style.display = "grid";
  });

  splashConnectWalletBtn.addEventListener("click", () => {
    walletModalOverlay.style.display = "flex";
  });

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      const targetScreenId = item.dataset.section + "-screen";
      const targetScreen = document.getElementById(targetScreenId);

      if (targetScreen) {
        screenViews.forEach((screen) => (screen.style.display = "none"));
        mainLobbyContainer.style.display = "none";
        targetScreen.style.display = "block";
      } else if (
        item.dataset.section === "clan" ||
        item.dataset.section === "quests" ||
        item.dataset.section === "tournament"
      ) {
        screenViews.forEach((screen) => (screen.style.display = "none"));
        mainLobbyContainer.style.display = "grid";
        preMatchLobby.style.display = "block";
      }
    });
  });

  backButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetScreenId = button.dataset.targetScreen;
      const targetScreen = document.getElementById(targetScreenId);

      if (targetScreen) {
        screenViews.forEach((screen) => (screen.style.display = "none"));
        mainLobbyContainer.style.display = "grid";
        preMatchLobby.style.display = "block";
        menuItems.forEach((i) => i.classList.remove("active"));
        document
          .querySelector(`.left-menu .menu-item[data-section="clan"]`)
          .classList.add("active");
      }
    });
  });

  mainLobbyContainer.style.display = "none";
  preMatchLobby.style.display = "block";
  walletConnectBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      walletModalOverlay.style.display = "flex";
    });
  });

  modalCloseBtn.addEventListener("click", () => {
    walletModalOverlay.style.display = "none";
  });

  walletModalOverlay.addEventListener("click", (e) => {
    if (e.target === walletModalOverlay) {
      walletModalOverlay.style.display = "none";
    }
  });

  metamaskConnectBtn.addEventListener("click", async () => {
    const success = await connectMetaMask();
    if (success) {
      walletModalOverlay.style.display = "none";
    }
  });

  walletconnectConnectBtn.addEventListener("click", () => {
    setTimeout(() => {
      const mockAddress = "0x" + Math.random().toString(16).substring(2, 42);
      walletAddressSpan.textContent = `${mockAddress.substring(
        0,
        6
      )}...${mockAddress.substring(mockAddress.length - 4)}`;
      ghcBalanceSpan.textContent = "1,500 GHC";
      nftCountSpan.textContent = "3 NFTs";
      walletConnectionOptions.style.display = "none";
      walletDetails.style.display = "block";
      walletDisconnectBtn.style.display = "block";
      mintXpBtn.style.display = "block";
      console.log("Connected with WalletConnect. Mock address:", mockAddress);
      
      handleWalletConnectedTransition();
    }, 1000);
  });

  mintXpBtn.addEventListener("click", mintXPTokens);

  walletDisconnectBtn.addEventListener("click", () => {
    walletAddressSpan.textContent = "";
    ghcBalanceSpan.textContent = "0";
    nftCountSpan.textContent = "0";
    walletConnectionOptions.style.display = "flex";
    walletDetails.style.display = "none";
    walletDisconnectBtn.style.display = "none";
    mintXpBtn.style.display = "none";
    connectedAddress = null;
    signer = null;
    console.log("Wallet disconnected.");
  });

  walletTabBtns.forEach((tabBtn) => {
    tabBtn.addEventListener("click", () => {
      walletTabBtns.forEach((btn) => btn.classList.remove("active"));
      tabBtn.classList.add("active");

      const targetTabId = `wallet-${tabBtn.dataset.walletTab}-tab`;
      walletTabContents.forEach((content) => (content.style.display = "none"));
      document.getElementById(targetTabId).style.display = "block";
    });
  });

  document.querySelectorAll(".ranking-tab-btn").forEach((tabBtn) => {
    tabBtn.addEventListener("click", () => {
      document
        .querySelectorAll(".ranking-tab-btn")
        .forEach((btn) => btn.classList.remove("active"));
      tabBtn.classList.add("active");

      document
        .querySelectorAll(".rankings-table")
        .forEach((table) => (table.style.display = "none"));
      document.getElementById(
        `${tabBtn.dataset.rankingTab}-rankings`
      ).style.display = "table";
    });
  });

  document.querySelectorAll(".profile-tab-btn").forEach((tabBtn) => {
    tabBtn.addEventListener("click", () => {
      document
        .querySelectorAll(".profile-tab-btn")
        .forEach((btn) => btn.classList.remove("active"));
      tabBtn.classList.add("active");

      document
        .querySelectorAll(".profile-tab-content")
        .forEach((content) => (content.style.display = "none"));
      document.getElementById(
        `profile-${tabBtn.dataset.profileTab}-tab`
      ).style.display = "block";
    });
  });

  document
    .querySelectorAll(".attachment-categories .category-btn")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".attachment-categories .category-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        console.log(`Switched to ${btn.dataset.attachmentType} attachments.`);
      });
    });

  function waitForEthers() {
    return new Promise((resolve) => {
      if (typeof ethers !== "undefined") {
        resolve();
      } else {
        const checkEthers = setInterval(() => {
          if (typeof ethers !== "undefined") {
            clearInterval(checkEthers);
            resolve();
          }
        }, 100);

        setTimeout(() => {
          clearInterval(checkEthers);
          console.error("Ethers.js failed to load");
          resolve();
        }, 5000);
      }
    });
  }

  async function initializeApp() {
    await waitForEthers();

    if (typeof ethers === "undefined") {
      console.error("Ethers.js is not available");
      alert("Failed to load Web3 library. Please refresh the page.");
      return;
    }

    console.log("Ethers.js loaded successfully:", ethers.version);

    initializeWeb3();

    console.log("=== MetaMask Detection Test ===");
    console.log(
      "window.ethereum exists:",
      typeof window.ethereum !== "undefined"
    );
    console.log("window.ethereum value:", window.ethereum);
    console.log("ethers library loaded:", typeof ethers !== "undefined");
    console.log("ethers version:", ethers.version);
    console.log("================================");
  }

  initializeApp();
});
