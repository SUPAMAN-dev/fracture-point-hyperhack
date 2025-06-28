document.addEventListener('DOMContentLoaded', () => {
    // --- Screen Elements ---
    const splashScreen = document.getElementById('splash-screen');
    const splashStartBtn = document.getElementById('splash-start-btn');
    const splashConnectWalletBtn = document.getElementById('splash-connect-wallet-btn');
    const loadingBarFill = document.querySelector('.loading-bar-fill');
    const loadingText = document.querySelector('.loading-text');

    const mainLobbyContainer = document.getElementById('main-lobby-container');
    const lobbyTopBar = document.getElementById('lobby-top-bar');
    const lobbyBottomBar = document.getElementById('lobby-bottom-bar');
    const lobbyMainContent = document.getElementById('lobby-main-content'); // Contains left menu, center, right panel

    // New screen sections
    const variantsScreen = document.getElementById('variants-screen');
    const playerProfileScreen = document.getElementById('player-profile-screen');
    const rankingsScreen = document.getElementById('rankings-screen');
    const trophyRoomScreen = document.getElementById('trophy-room-screen');
    const attachmentCenterScreen = document.getElementById('attachment-center-screen');

    const allScreens = document.querySelectorAll('.screen-view'); // Generic class for full-page screens

    // --- Lobby Elements ---
    const menuItems = document.querySelectorAll('.left-menu .menu-item');
    const startButton = document.querySelector('.start-btn');
    const backButtons = document.querySelectorAll('.back-btn'); // All back buttons

    // --- Wallet Modal Elements ---
    const walletConnectTriggerBtn = document.querySelector('.right-panel-item.wallet-connect-btn');
    const walletModalOverlay = document.getElementById('wallet-modal-overlay');
    const walletModalCloseBtn = document.querySelector('.modal-close-btn');
    const metamaskConnectBtn = document.getElementById('metamask-connect');
    const walletconnectConnectBtn = document.getElementById('walletconnect-connect');
    const walletDetailsSection = document.getElementById('wallet-details');
    const walletAddressSpan = document.getElementById('wallet-address');
    const ghcBalanceSpan = document.getElementById('ghc-balance');
    const nftCountSpan = document.getElementById('nft-count');
    const walletDisconnectBtn = document.getElementById('wallet-disconnect-btn');

    // Wallet modal tabs
    const walletTabButtons = document.querySelectorAll('.wallet-tab-btn');
    const walletTabContents = document.querySelectorAll('.wallet-tab-content');


    // --- Player Profile Tabs ---
    const profileTabButtons = document.querySelectorAll('.profile-tab-btn');
    const profileTabContents = document.querySelectorAll('.profile-tab-content');

    // --- Rankings Tabs ---
    const rankingTabButtons = document.querySelectorAll('.ranking-tab-btn');
    const rankingTableContents = document.querySelectorAll('.rankings-list-container > div, .rankings-list-container > table');


    // --- Attachment Center Categories ---
    const attachmentCategoryBtns = document.querySelectorAll('.attachment-categories .category-btn');
    const attachmentGrid = document.querySelector('.attachment-grid'); // We'll update its content dynamically for each category


    // --- Functions ---

    // Function to show a specific main screen (Lobby, Variants, Profile, etc.)
    function showScreen(screenId) {
        // Hide all main content and full screens
        lobbyMainContent.style.display = 'none';
        allScreens.forEach(screen => screen.style.display = 'none');
        lobbyTopBar.style.display = 'none';
        lobbyBottomBar.style.display = 'none';

        // Specific handling for each screen
        if (screenId === 'pre-match-lobby') {
            lobbyMainContent.style.display = 'flex';
            lobbyTopBar.style.display = 'flex';
            lobbyBottomBar.style.display = 'flex';
        } else if (screenId === 'variants') {
            variantsScreen.style.display = 'flex';
            variantsScreen.querySelector('.heroes-top-bar').style.display = 'flex';
        } else if (screenId === 'player-profile') {
            playerProfileScreen.style.display = 'flex';
            playerProfileScreen.querySelector('.heroes-top-bar').style.display = 'flex';
        } else if (screenId === 'leaderboard') { // Rankings screen uses 'leaderboard' data-section
            rankingsScreen.style.display = 'flex';
            rankingsScreen.querySelector('.heroes-top-bar').style.display = 'flex';
        } else if (screenId === 'trophy-room') {
            trophyRoomScreen.style.display = 'flex';
            trophyRoomScreen.querySelector('.heroes-top-bar').style.display = 'flex';
        } else if (screenId === 'attachment-center') {
            attachmentCenterScreen.style.display = 'flex';
            attachmentCenterScreen.querySelector('.heroes-top-bar').style.display = 'flex';
            // Default to 'weapons' category when entering Attachment Center
            updateAttachmentGrid('weapons');
            attachmentCategoryBtns.forEach(btn => {
                if (btn.dataset.attachmentType === 'weapons') {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

        }
        // Add more else if for other full-screen pages if needed

        // Update active menu item in the left sidebar (Lobby's left menu)
        menuItems.forEach(item => {
            if (item.dataset.section === screenId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        console.log(`Mapsd to: ${screenId} section`);
    }

    // Function to show/hide the wallet modal
    function toggleWalletModal(show) {
        walletModalOverlay.style.display = show ? 'flex' : 'none';
    }

    // --- Splash Screen Logic ---
    let splashLoaded = false;
    loadingBarFill.addEventListener('animationend', () => {
        if (!splashLoaded) {
            loadingText.textContent = 'Ready to play!';
            splashStartBtn.style.display = 'inline-block';
            splashConnectWalletBtn.style.display = 'inline-block';
            splashLoaded = true;
        }
    });

    splashStartBtn.addEventListener('click', () => {
        splashScreen.style.display = 'none';
        mainLobbyContainer.style.display = 'flex';
        showScreen('pre-match-lobby'); // Show the main lobby content
    });

    splashConnectWalletBtn.addEventListener('click', () => {
        splashScreen.style.display = 'none';
        mainLobbyContainer.style.display = 'flex';
        showScreen('pre-match-lobby'); // Show the main lobby first
        toggleWalletModal(true); // Then open the wallet modal
        connectWallet(); // Attempt to connect wallet immediately
    });


    // --- Lobby Menu Item Click Listeners ---
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            showScreen(item.dataset.section);
        });
    });

    // --- Back Buttons Listeners ---
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            showScreen(button.dataset.targetScreen);
        });
    });

    // --- Lobby Start Button Click ---
    startButton.addEventListener('click', () => {
        console.log('START button clicked! (Initiate game session)');
        // In a real game, this would trigger game launch or match-making
    });

    // --- Wallet Modal Listeners ---
    walletConnectTriggerBtn.addEventListener('click', () => {
        toggleWalletModal(true);
        // You might want to call connectWallet() here too, or just when the actual connect buttons are pressed.
    });

    walletModalCloseBtn.addEventListener('click', () => {
        toggleWalletModal(false);
    });

    metamaskConnectBtn.addEventListener('click', async () => {
        const address = await connectWallet();
        if (address) {
            walletAddressSpan.textContent = address;
            ghcBalanceSpan.textContent = "1,290 GHC"; // Mock balance
            nftCountSpan.textContent = "5"; // Mock NFT count
            walletDetailsSection.style.display = 'block';
            walletDisconnectBtn.style.display = 'inline-block';
            metamaskConnectBtn.style.display = 'none'; // Hide connect buttons after successful connection
            walletconnectConnectBtn.style.display = 'none';
            console.log("MetaMask connected and details updated.");
        }
    });

    walletconnectConnectBtn.addEventListener('click', () => {
        console.log("WalletConnect clicked (mockup)");
        // Implement WalletConnect logic here
        alert("WalletConnect integration is a mockup. You'd integrate a library here.");
    });

    walletDisconnectBtn.addEventListener('click', () => {
        console.log("Wallet Disconnected (mockup)");
        walletDetailsSection.style.display = 'none';
        walletDisconnectBtn.style.display = 'none';
        metamaskConnectBtn.style.display = 'inline-block'; // Show connect buttons again
        walletconnectConnectBtn.style.display = 'inline-block';
        alert("Wallet disconnected."); // In real app, clear connected state
    });

    // Wallet modal tab switching
    walletTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            walletTabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const targetTab = button.dataset.walletTab;
            walletTabContents.forEach(content => {
                if (content.id === `wallet-${targetTab}-tab`) {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            });
        });
    });

    // --- Player Profile Tab Switching ---
    profileTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            profileTabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const targetTab = button.dataset.profileTab;
            profileTabContents.forEach(content => {
                if (content.id === `profile-${targetTab}-tab`) {
                    content.style.display = 'grid'; // Assuming grid layout for content
                } else {
                    content.style.display = 'none';
                }
            });
        });
    });

    // --- Rankings Tab Switching ---
    rankingTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            rankingTabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const targetTab = button.dataset.rankingTab;
            rankingTableContents.forEach(content => {
                if (content.id === `${targetTab}-rankings`) {
                    content.style.display = 'table'; // For the table
                    if (targetTab !== 'all-players') {
                        content.style.display = 'block'; // For ul/div content
                    }
                } else {
                    content.style.display = 'none';
                }
            });
        });
    });

    // --- Attachment Center Category Switching (Mock Data) ---
    const attachmentData = {
        weapons: [
            { name: "Neon Striker AR", rarity: "Epic", image: "images/skin_weapon_assault.png", locked: false },
            { name: "Plasma Shotgun", rarity: "Legendary", image: "images/skin_weapon_shotgun.png", locked: false },
            { name: "Stealth Sniper", rarity: "Rare", image: "images/skin_weapon_sniper.png", locked: true }
        ],
        vehicles: [
            { name: "Desert Storm Buggy", rarity: "Rare", image: "images/skin_vehicle_buggy.png", locked: false },
            { name: "Urban Rider Bike", rarity: "Common", image: "images/skin_vehicle_bike.png", locked: false },
            { name: "Heavy Tank", rarity: "Legendary", image: "images/skin_vehicle_tank.png", locked: true }
        ],
        jetpacks: [
            { name: "Turbo Thruster", rarity: "Epic", image: "images/skin_jetpack_default.png", locked: false },
            { name: "Galactic Glide", rarity: "Legendary", image: "images/skin_jetpack_locked.png", locked: true }
        ],
        variants: [
            { name: "Ryley Elite", rarity: "Epic", image: "images/variant_ryley_elite.png", locked: false },
            { name: "Maka Shadow", rarity: "Rare", image: "images/variant_maka_shadow.png", locked: false }
        ]
    };

    function updateAttachmentGrid(category) {
        attachmentGrid.innerHTML = ''; // Clear current grid
        const items = attachmentData[category];
        items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('attachment-item');
            if (item.locked) itemDiv.classList.add('locked');

            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="attachment-image">
                <div class="attachment-name">${item.name}</div>
                <div class="attachment-rarity ${item.rarity.toLowerCase()}">${item.rarity}</div>
                <button class="preview-btn" ${item.locked ? 'disabled' : ''}>Preview</button>
                <button class="equip-btn" ${item.locked ? 'disabled' : ''}>${item.locked ? 'Locked' : 'Equip'}</button>
            `;
            attachmentGrid.appendChild(itemDiv);
        });
    }

    attachmentCategoryBtns.forEach(button => {
        button.addEventListener('click', () => {
            attachmentCategoryBtns.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateAttachmentGrid(button.dataset.attachmentType);
        });
    });


    // --- Web3 Placeholder Functions ---

    async function connectWallet() {
        console.log("Attempting to connect wallet...");
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const currentAccount = accounts[0];
                console.log("Wallet connected:", currentAccount);
                alert(`Wallet Connected: ${currentAccount.substring(0, 6)}...${currentAccount.slice(-4)}`);
                return currentAccount;
            } catch (error) {
                console.error("Wallet connection failed:", error);
                alert("Wallet connection failed. Please ensure MetaMask is unlocked.");
                return null;
            }
        } else {
            console.warn("MetaMask or similar wallet extension not detected.");
            alert("Please install MetaMask or another Ethereum wallet to connect.");
            return null;
        }
    }

    // --- Initial Load ---
    // Start with splash screen visible, lobby hidden
    mainLobbyContainer.style.display = 'none';
    splashScreen.style.display = 'flex'; // Ensure splash screen is visible on load
});