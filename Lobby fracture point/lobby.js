document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const loadingBarFill = document.querySelector('.loading-bar-fill');
    const loadingText = document.querySelector('.loading-text');
    const splashStartBtn = document.getElementById('splash-start-btn');
    const splashConnectWalletBtn = document.getElementById('splash-connect-wallet-btn');
    const mainLobbyContainer = document.getElementById('main-lobby-container');

    const menuItems = document.querySelectorAll('.left-menu .menu-item');
    const backButtons = document.querySelectorAll('.back-btn');
    const screenViews = document.querySelectorAll('.screen-view');
    const preMatchLobby = document.getElementById('pre-match-lobby');

    const walletConnectBtns = document.querySelectorAll('.wallet-connect-btn');
    const walletModalOverlay = document.getElementById('wallet-modal-overlay');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const metamaskConnectBtn = document.getElementById('metamask-connect');
    const walletconnectConnectBtn = document.getElementById('walletconnect-connect');
    const walletConnectionOptions = document.getElementById('wallet-connection-options');
    const walletDetails = document.getElementById('wallet-details');
    const walletAddressSpan = document.getElementById('wallet-address');
    const ghcBalanceSpan = document.getElementById('ghc-balance');
    const nftCountSpan = document.getElementById('nft-count');
    const walletDisconnectBtn = document.getElementById('wallet-disconnect-btn');
    const walletTabBtns = document.querySelectorAll('.wallet-tab-btn');
    const walletTabContents = document.querySelectorAll('.wallet-tab-content');

    // --- Splash Screen Logic ---
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        loadingBarFill.style.width = `${progress}%`;
        if (progress === 100) {
            loadingText.textContent = 'Connection successful!';
            clearInterval(interval);
            setTimeout(() => {
                splashStartBtn.style.display = 'block';
                splashConnectWalletBtn.style.display = 'block';
            }, 500); // Show buttons after loading completes
        }
    }, 200);

    splashStartBtn.addEventListener('click', () => {
        splashScreen.style.display = 'none';
        mainLobbyContainer.style.display = 'grid';
    });

    splashConnectWalletBtn.addEventListener('click', () => {
        walletModalOverlay.style.display = 'flex';
    });

    // --- Lobby Navigation Logic ---
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const targetScreenId = item.dataset.section + '-screen';
            const targetScreen = document.getElementById(targetScreenId);

            if (targetScreen) {
                screenViews.forEach(screen => screen.style.display = 'none');
                mainLobbyContainer.style.display = 'none'; // Hide main lobby
                targetScreen.style.display = 'block';
            } else if (item.dataset.section === 'clan' || item.dataset.section === 'quests' || item.dataset.section === 'tournament') {
                // For 'Clan', 'Quests', 'Tournament', etc., stay in the main lobby or show specific sections there
                screenViews.forEach(screen => screen.style.display = 'none');
                mainLobbyContainer.style.display = 'grid';
                preMatchLobby.style.display = 'block'; // Ensure the central pre-match lobby is visible
            }
        });
    });

    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetScreenId = button.dataset.targetScreen;
            const targetScreen = document.getElementById(targetScreenId);

            if (targetScreen) {
                screenViews.forEach(screen => screen.style.display = 'none');
                mainLobbyContainer.style.display = 'grid'; // Show main lobby
                preMatchLobby.style.display = 'block'; // Ensure the central pre-match lobby is visible
                // Reset active menu item in the left menu
                menuItems.forEach(i => i.classList.remove('active'));
                document.querySelector(`.left-menu .menu-item[data-section="clan"]`).classList.add('active'); // Default to clan/main lobby
            }
        });
    });

    // Default view when starting the lobby (after splash)
    mainLobbyContainer.style.display = 'none'; // Hidden initially
    preMatchLobby.style.display = 'block'; // Ensure it's the first visible section in lobby

    // --- Wallet Modal Logic ---
    walletConnectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            walletModalOverlay.style.display = 'flex';
        });
    });

    modalCloseBtn.addEventListener('click', () => {
        walletModalOverlay.style.display = 'none';
    });

    // Close modal if clicking outside the content
    walletModalOverlay.addEventListener('click', (e) => {
        if (e.target === walletModalOverlay) {
            walletModalOverlay.style.display = 'none';
        }
    });

    // Mock wallet connection
    const mockWalletConnect = (walletType) => {
        console.log(`Attempting to connect with ${walletType}...`);
        // In a real application, you would use Ethers.js or Web3.js here
        // Example for MetaMask (requires window.ethereum):
        /*
        if (window.ethereum) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                // Fetch real balance and NFTs here
                walletAddressSpan.textContent = address;
                ghcBalanceSpan.textContent = '1500 GHC'; // Replace with actual fetch
                nftCountSpan.textContent = '3 NFTs'; // Replace with actual fetch
                walletConnectionOptions.style.display = 'none';
                walletDetails.style.display = 'block';
                walletDisconnectBtn.style.display = 'block';
            } catch (error) {
                console.error("User denied account access or other error:", error);
                alert("Failed to connect wallet. Please ensure MetaMask is installed and unlocked.");
            }
        } else {
            alert("MetaMask is not installed. Please install it to connect.");
        }
        */

        // MOCK IMPLEMENTATION:
        setTimeout(() => {
            const mockAddress = "0x" + Math.random().toString(16).substring(2, 42); // Generate a mock address
            walletAddressSpan.textContent = `${mockAddress.substring(0, 6)}...${mockAddress.substring(mockAddress.length - 4)}`;
            ghcBalanceSpan.textContent = '1,500 GHC';
            nftCountSpan.textContent = '3 NFTs';
            walletConnectionOptions.style.display = 'none';
            walletDetails.style.display = 'block';
            walletDisconnectBtn.style.display = 'block';
            console.log(`Connected with ${walletType}. Mock address: ${mockAddress}`);
        }, 1000);
    };

    metamaskConnectBtn.addEventListener('click', () => mockWalletConnect('MetaMask'));
    walletconnectConnectBtn.addEventListener('click', () => mockWalletConnect('WalletConnect'));

    walletDisconnectBtn.addEventListener('click', () => {
        walletAddressSpan.textContent = '';
        ghcBalanceSpan.textContent = '0';
        nftCountSpan.textContent = '0';
        walletConnectionOptions.style.display = 'flex';
        walletDetails.style.display = 'none';
        walletDisconnectBtn.style.display = 'none';
        console.log('Wallet disconnected.');
    });

    // Wallet modal tab switching
    walletTabBtns.forEach(tabBtn => {
        tabBtn.addEventListener('click', () => {
            walletTabBtns.forEach(btn => btn.classList.remove('active'));
            tabBtn.classList.add('active');

            const targetTabId = `wallet-${tabBtn.dataset.walletTab}-tab`;
            walletTabContents.forEach(content => content.style.display = 'none');
            document.getElementById(targetTabId).style.display = 'block';
        });
    });

    // Rankings tab switching
    document.querySelectorAll('.ranking-tab-btn').forEach(tabBtn => {
        tabBtn.addEventListener('click', () => {
            document.querySelectorAll('.ranking-tab-btn').forEach(btn => btn.classList.remove('active'));
            tabBtn.classList.add('active');

            document.querySelectorAll('.rankings-table').forEach(table => table.style.display = 'none');
            document.getElementById(`${tabBtn.dataset.rankingTab}-rankings`).style.display = 'table'; // Use 'table' for actual table display
        });
    });

    // Profile tab switching
    document.querySelectorAll('.profile-tab-btn').forEach(tabBtn => {
        tabBtn.addEventListener('click', () => {
            document.querySelectorAll('.profile-tab-btn').forEach(btn => btn.classList.remove('active'));
            tabBtn.classList.add('active');

            document.querySelectorAll('.profile-tab-content').forEach(content => content.style.display = 'none');
            document.getElementById(`profile-${tabBtn.dataset.profileTab}-tab`).style.display = 'block';
        });
    });

    // Attachment categories switching
    document.querySelectorAll('.attachment-categories .category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.attachment-categories .category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // Logic to filter attachment grid based on category goes here
            console.log(`Switched to ${btn.dataset.attachmentType} attachments.`);
        });
    });

});