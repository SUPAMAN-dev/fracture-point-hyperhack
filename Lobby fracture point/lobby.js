* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Roboto', sans-serif;
    background-color: #1a1a2e;
    color: #e0e0e0;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    touch-action: manipulation;
}

@media (orientation: landscape) and (max-width: 1024px) {
    body {
        height: 100vh;
        width: 100vw;
    }

    .lobby-container,
    .screen-view {
        width: 100vw;
        height: 100vh;
        max-width: 1024px;
        max-height: 768px;
        overflow: hidden;
    }
}

.splash-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(images/fpbg1.jpg);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 100;
}

.splash-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.logo-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.logo {
    max-width: 150px;
    height: auto;
    filter: drop-shadow(0 0 10px rgba(0, 240, 255, 0.8));
    animation: fadeIn 2s ease-out;
}

.gamehouse-logo {
    margin-right: 15px;
}

.fracture-point-logo {
    margin-left: 15px;
}

.logo-x {
    font-family: 'Orbitron', sans-serif;
    font-size: 2em;
    color: #FFD700;
    margin: 0 10px;
}

.game-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.5em;
    color: #00F0FF;
    text-shadow: 0 0 20px rgba(0, 240, 255, 0.8);
    margin-bottom: 30px;
    animation: pulsate 2s infinite alternate;
}

.loading-bar-container {
    width: 80%;
    max-width: 400px;
    height: 15px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 10px;
    border: 1px solid rgba(0, 240, 255, 0.5);
    box-shadow: 0 0 15px rgba(0, 240, 255, 0.5);
}

.loading-bar-fill {
    width: 0%;
    height: 100%;
    background: linear-gradient(to right, #00BFFF, #00F0FF);
    border-radius: 8px;
    animation: loadBar 3s forwards cubic-bezier(0.25, 0.1, 0.25, 1);
}

.loading-text {
    font-family: 'Roboto', sans-serif;
    font-size: 1.1em;
    color: #aaa;
    animation: fadeIn 2s ease-out 1s forwards;
}

.splash-start-btn,
.splash-connect-wallet-btn {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.5em;
    padding: 15px 30px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    margin-top: 20px;
    background: linear-gradient(to right, #00F0FF, #00BFFF);
    color: #1a1a2e;
    font-weight: bold;
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.8);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.splash-start-btn:hover,
.splash-connect-wallet-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(0, 240, 255, 1);
}

@keyframes loadBar {
    0% {
        width: 0%;
    }

    100% {
        width: 100%;
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes pulsate {
    0% {
        transform: scale(1);
        text-shadow: 0 0 15px rgba(0, 240, 255, 0.6);
    }

    100% {
        transform: scale(1.02);
        text-shadow: 0 0 25px rgba(0, 240, 255, 1);
    }
}

.lobby-container {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: #1a1a2e;
    position: relative;
    border: 1px solid #333;
    overflow: hidden;
    background-image: url('images/fpbg2.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: none;
}

.lobby-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
}

.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background: linear-gradient(to bottom, rgba(30, 30, 46, 0.8), rgba(30, 30, 46, 0));
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
}

.top-left {
    display: flex;
    align-items: center;
}

.profile-section {
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
    padding: 5px 10px;
    border-radius: 20px;
    border: 1px solid #00F0FF;
    box-shadow: 0 0 8px rgba(0, 240, 255, 0.6);
}

.profile-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    border: 2px solid #00BFFF;
    object-fit: cover;
}

.profile-info {
    display: flex;
    flex-direction: column;
    font-size: 0.9em;
}

.player-name {
    font-weight: bold;
    color: #00F0FF;
}

.player-level {
    font-size: 0.75em;
    color: #aaa;
}

.top-right {
    display: flex;
    align-items: center;
}

.currency-display {
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
    padding: 5px 10px;
    border-radius: 20px;
    margin-right: 15px;
    border: 1px solid #FFD700;
    box-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
}

.currency-icon {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    object-fit: contain;
}

.currency-value {
    font-weight: bold;
    margin-right: 10px;
    color: #FFD700;
}

.top-icons {
    display: flex;
}

.icon-btn {
    background: none;
    border: none;
    color: #e0e0e0;
    font-size: 1.5em;
    padding: 5px;
    cursor: pointer;
    margin-left: 10px;
    transition: color 0.3s ease;
}

.icon-btn:hover {
    color: #00F0FF;
}

.main-content {
    display: flex;
    flex-grow: 1;
    padding-top: 70px;
    padding-bottom: 70px;
    position: relative;
    z-index: 2;
}

.left-menu {
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    width: 195px;
    background: linear-gradient(to right, rgba(203, 203, 209, 0), rgba(20, 20, 30, 0));
    border-right: 1px solid rgba(0, 240, 255, 0.3);
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5);
    z-index: 5;
}

.menu-item {
    background: none;
    border: none;
    color: #e0e0e0;
    font-family: 'Orbitron', sans-serif;
    font-size: 1.1em;
    text-align: left;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    position: relative;
}

.menu-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(to right, rgba(0, 240, 255, 0.3), transparent);
    transition: width 0.3s ease;
    z-index: -1;
}

.menu-item:hover::before,
.menu-item.active::before {
    width: 100%;
}

.menu-item:hover,
.menu-item.active {
    background-color: transparent;
    color: #00F0FF;
    border-left: 5px solid #00F0FF;
    padding-left: 15px;
}

.menu-item .menu-icon {
    font-size: 1.2em;
    margin-right: 10px;
    color: #FFD700;
}

#pre-match-lobby {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2;
    background: rgba(0, 0, 0, 0.1);
    border: 1px dashed rgba(255, 255, 255, 0.2);
}

.character-display-placeholder {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.placeholder-character {
    max-height: 80%;
    max-width: 50%;
    object-fit: contain;
    animation: floatEffect 3s ease-in-out infinite alternate;
}

@keyframes floatEffect {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-10px);
    }
}

.character-name-overlay {
    position: absolute;
    top: 15%;
    right: 10%;
    font-family: 'Orbitron', sans-serif;
    font-size: 3em;
    color: #FFD700;
    text-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
    opacity: 0.8;
}

.supplybox-overlay {
    position: absolute;
    bottom: 20%;
    right: 5%;
    background-color: rgba(0, 0, 0, 0.6);
    border: 2px solid #00F0FF;
    padding: 10px 15px;
    text-align: center;
    font-family: 'Orbitron', sans-serif;
    font-size: 0.9em;
    color: #00F0FF;
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.7);
    border-radius: 5px;
}

.supplybox-overlay .timer {
    font-size: 1.2em;
    font-weight: bold;
    color: #FFD700;
    margin-top: 5px;
}

.right-panel {
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 200px;
    background: linear-gradient(to left, rgba(20, 20, 30, 0.7), rgba(20, 20, 30, 0));
    border-left: 1px solid rgba(0, 240, 255, 0.3);
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.5);
    z-index: 5;
}

.right-panel-item {
    background-color: rgba(0, 0, 0, 0.4);
    border: 1px solid #444;
    color: #e0e0e0;
    padding: 15px 10px;
    margin-bottom: 15px;
    font-family: 'Orbitron', sans-serif;
    font-size: 0.9em;
    text-align: center;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease, border-color 0.3s ease;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    position: relative;
    overflow: hidden;
}

.right-panel-item::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    transform: rotate(45deg);
    transition: transform 0.3s ease;
    z-index: 0;
}

.right-panel-item:hover::before {
    transform: rotate(45deg) translate(10%, 10%);
}

.right-panel-item:hover {
    background-color: rgba(0, 240, 255, 0.15);
    border-color: #00F0FF;
    color: #00F0FF;
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.6);
}

.right-panel-item.wallet-connect-btn {
    border-color: #fdfdfb00;
    color: #FFD700;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
}

.right-panel-item.mint-xp-btn {
    border-color: #fdfdfb00;
    color: #00FF00;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.6);
}

.right-panel-item.battle-pass {
    border-color: #f9fafa00;
    color: #00BFFF;
}

.right-panel-item.shop {
    border-color: #fcfcfb00;
    color: #FFD700;
}

.right-panel-item.lottery {
    border-color: #fffeff00;
    color: #DA70D6;
}

.right-panel-item.events {
    border-color: #fefefe00;
    color: #32CD32;
}


.bottom-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background: linear-gradient(to top, rgba(30, 30, 46, 0.8), rgba(30, 30, 46, 0));
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
}

.bottom-left-buttons {
    display: flex;
    align-items: center;
}

.bottom-icon-btn {
    background-color: rgba(0, 0, 0, 0.4);
    border: 1px solid #00F0FF;
    border-radius: 5px;
    color: #00F0FF;
    font-family: 'Orbitron', sans-serif;
    font-size: 1em;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 0 8px rgba(0, 240, 255, 0.6);
    transition: background-color 0.3s ease;
}

.bottom-icon-btn .icon {
    font-size: 1.2em;
    margin-right: 8px;
}

.bottom-icon-btn:hover {
    background-color: rgba(0, 240, 255, 0.1);
}

.world-message {
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid #555;
    padding: 10px 15px;
    border-radius: 5px;
    margin-left: 20px;
    font-size: 0.85em;
    color: #aaa;
    flex-grow: 1;
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.bottom-right-controls {
    display: flex;
    align-items: center;
}

.recruit-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 15px;
}

.recruit-btn {
    background-color: rgba(0, 0, 0, 0.4);
    border: 1px solid #FFD700;
    color: #FFD700;
    font-family: 'Orbitron', sans-serif;
    font-size: 0.8em;
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 5px;
    cursor: pointer;
    box-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
    transition: background-color 0.3s ease;
}

.recruit-btn:hover {
    background-color: rgba(255, 215, 0, 0.1);
}

.mode-select {
    background-color: rgba(0, 0, 0, 0.4);
    border: 1px solid #00F0FF;
    color: #00F0FF;
    font-family: 'Orbitron', sans-serif;
    font-size: 0.75em;
    text-align: center;
    padding: 5px 10px;
    border-radius: 5px;
}

.start-btn {
    background: linear-gradient(to right, #00F0FF, #00BFFF);
    border: none;
    color: #1a1a2e;
    font-family: 'Orbitron', sans-serif;
    font-size: 1.8em;
    font-weight: bold;
    padding: 15px 30px;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.5) inset;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    text-transform: uppercase;
}

.start-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(0, 240, 255, 1), 0 0 15px rgba(255, 255, 255, 0.8) inset;
}

.screen-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    z-index: 50;
    background: url('images/fpbg1.jpg') no-repeat center center/cover;
    display: none;
}

.screen-view::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
}

.heroes-top-bar {
    background: linear-gradient(to bottom, rgba(30, 30, 46, 0.9), rgba(30, 30, 46, 0.2));
    border-bottom: 1px solid rgba(0, 240, 255, 0.3);
}

.back-btn {
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid #00F0FF;
    color: #00F0FF;
    font-family: 'Orbitron', sans-serif;
    font-size: 1.2em;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: background-color 0.3s ease, border-color 0.3s ease;
}

.back-btn .icon {
    margin-right: 8px;
    font-size: 1.5em;
}

.back-btn:hover {
    background-color: rgba(0, 240, 255, 0.15);
    border-color: #FFD700;
    color: #FFD700;
}

.heroes-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    position: relative;
    z-index: 2;
}

.heroes-filter-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

.filter-icons {
    display: flex;
}

.filter-btn {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 240, 255, 0.4);
    color: #00F0FF;
    font-size: 1.4em;
    padding: 8px 12px;
    border-radius: 5px;
    margin-right: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease, border-color 0.3s ease;
}

.filter-btn:hover,
.filter-btn.active {
    background-color: rgba(0, 240, 255, 0.2);
    border-color: #FFD700;
    color: #FFD700;
}

.hero-count {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.1em;
    color: #FFD700;
    font-weight: bold;
}

.sort-dropdown {
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid #00F0FF;
    color: #00F0FF;
    padding: 8px 12px;
    border-radius: 5px;
    font-family: 'Roboto', sans-serif;
    font-size: 1em;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url('data:image/svg+xml;utf8,<svg fill="%2300F0FF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
    background-repeat: no-repeat;
    background-position: right 8px center;
    background-size: 16px;
}

.sort-dropdown option {
    background-color: #1a1a2e;
    color: #e0e0e0;
}

.heroes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 15px;
    padding: 10px;
    overflow-y: auto;
    flex-grow: 1;
    padding-bottom: 20px;
}

.hero-card {
    background-color: rgba(25, 25, 35, 0.7);
    border: 1px solid rgba(0, 240, 255, 0.3);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10px;
    position: relative;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.hero-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 15px rgba(0, 240, 255, 0.7);
    border-color: #00F0FF;
}

.hero-card.locked {
    filter: grayscale(80%) brightness(50%);
    pointer-events: none;
    border-color: rgba(255, 0, 0, 0.3);
}

.hero-card.locked::after {
    content: 'LOCKED';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: #FF0000;
    padding: 5px 10px;
    border-radius: 3px;
    font-family: 'Orbitron', sans-serif;
    font-size: 1em;
    font-weight: bold;
    border: 1px solid #FF0000;
}

.hero-image {
    width: 100%;
    height: auto;
    display: block;
    border-bottom: 1px solid rgba(0, 240, 255, 0.2);
}

.hero-name {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.1em;
    font-weight: bold;
    margin-top: 10px;
    color: #FFD700;
    text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
    text-transform: uppercase;
}

.hero-status {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: rgba(0, 0, 0, 0.6);
    color: #00F0FF;
    padding: 3px 6px;
    border-radius: 3px;
    font-size: 0.7em;
    font-weight: bold;
}

.hero-role-icons {
    margin-top: 5px;
    display: flex;
    gap: 5px;
}

.role-icon {
    font-size: 0.9em;
    background-color: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #e0e0e0;
}

.equip-btn {
    background: linear-gradient(to right, #00F0FF, #00BFFF);
    border: none;
    color: #1a1a2e;
    font-family: 'Orbitron', sans-serif;
    font-size: 0.9em;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.6);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.equip-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(0, 240, 255, 0.8);
}

.equip-btn:disabled {
    background: #444;
    color: #888;
    cursor: not-allowed;
    box-shadow: none;
}

.player-profile-screen .profile-content {
    flex-grow: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 2;
    overflow-y: auto;
}

.profile-header {
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    border-radius: 8px;
    border: 1px solid rgba(0, 240, 255, 0.3);
    margin-bottom: 20px;
}

.profile-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid #00F0FF;
    object-fit: cover;
    margin-right: 20px;
    box-shadow: 0 0 15px rgba(0, 240, 255, 0.7);
}

.profile-info-main h2 {
    font-family: 'Orbitron', sans-serif;
    color: #FFD700;
    font-size: 2em;
    margin-bottom: 5px;
}

.profile-info-main p {
    font-size: 1.1em;
    color: #e0e0e0;
    margin-bottom: 3px;
}

.career-stats-section {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    border-radius: 8px;
    border: 1px solid rgba(255, 215, 0, 0.3);
    margin-bottom: 20px;
}

.career-stats-section h3 {
    font-family: 'Orbitron', sans-serif;
    color: #00F0FF;
    margin-bottom: 15px;
    text-align: center;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
}

.stat-item {
    background-color: rgba(25, 25, 35, 0.7);
    padding: 10px;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.95em;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.stat-item span {
    font-weight: bold;
    color: #FFD700;
}

.profile-tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
}

.profile-tab-btn {
    background-color: rgba(0, 0, 0, 0.6);
    border: 1px solid #00F0FF;
    color: #00F0FF;
    font-family: 'Orbitron', sans-serif;
    font-size: 1em;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    margin: 0 5px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.profile-tab-btn:hover,
.profile-tab-btn.active {
    background-color: rgba(0, 240, 255, 0.2);
    border-color: #FFD700;
    color: #FFD700;
}

.profile-tab-content {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.variants-owned-grid,
.badges-owned-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
}

.mini-hero-card,
.mini-badge-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(25, 25, 35, 0.7);
    padding: 5px;
    border-radius: 5px;
    border: 1px solid rgba(0, 240, 255, 0.2);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.mini-hero-card img,
.mini-badge-card img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    margin-bottom: 5px;
}

.mini-hero-card span,
.mini-badge-card span {
    font-size: 0.8em;
    font-family: 'Orbitron', sans-serif;
    color: #e0e0e0;
    text-align: center;
}

.rankings-content {
    flex-grow: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 2;
    overflow-y: auto;
}

.rankings-tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.ranking-tab-btn {
    background-color: rgba(0, 0, 0, 0.6);
    border: 1px solid #00F0FF;
    color: #00F0FF;
    font-family: 'Orbitron', sans-serif;
    font-size: 1em;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    margin: 0 5px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.ranking-tab-btn:hover,
.ranking-tab-btn.active {
    background-color: rgba(0, 240, 255, 0.2);
    border-color: #FFD700;
    color: #FFD700;
}

.rankings-list-container {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 20px;
    flex-grow: 1;
}

.rankings-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 15px;
}

.rankings-table th,
.rankings-table td {
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 10px;
    text-align: left;
    font-family: 'Roboto', sans-serif;
}

.rankings-table th {
    background-color: rgba(0, 240, 255, 0.1);
    color: #00F0FF;
    font-family: 'Orbitron', sans-serif;
    font-weight: bold;
}

.rankings-table tr:nth-child(even) {
    background-color: rgba(25, 25, 35, 0.3);
}

.rankings-table td {
    color: #e0e0e0;
}

.table-badge {
    width: 30px;
    height: 30px;
    vertical-align: middle;
}

.how-to-qualify-btn {
    background: linear-gradient(to right, #FFD700, #FFA500);
    border: none;
    color: #1a1a2e;
    font-family: 'Orbitron', sans-serif;
    font-size: 1em;
    padding: 12px 25px;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.7);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    align-self: center;
}

.how-to-qualify-btn:hover {
    transform: scale(1.03);
    box-shadow: 0 0 20px rgba(255, 215, 0, 1);
}

.trophy-room-content {
    flex-grow: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 2;
    overflow-y: auto;
}

.earned-badges-section,
.achievements-section {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    border-radius: 8px;
    border: 1px solid rgba(0, 240, 255, 0.3);
    margin-bottom: 20px;
}

.earned-badges-section h3,
.achievements-section h3 {
    font-family: 'Orbitron', sans-serif;
    color: #FFD700;
    margin-bottom: 15px;
    text-align: center;
}

.badge-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 15px;
}

.badge-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(25, 25, 35, 0.7);
    padding: 10px;
    border-radius: 8px;
    border: 1px solid rgba(0, 240, 255, 0.2);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    text-align: center;
}

.badge-item img {
    width: 70px;
    height: 70px;
    object-fit: contain;
    margin-bottom: 8px;
}

.badge-item span {
    font-family: 'Roboto', sans-serif;
    font-size: 0.85em;
    color: #e0e0e0;
}

.badge-item.locked {
    filter: grayscale(100%) brightness(50%);
}

.achievement-list {
    list-style: none;
    padding: 0;
}

.achievement-list li {
    background-color: rgba(25, 25, 35, 0.7);
    padding: 10px 15px;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 10px;
    font-size: 1em;
    color: #e0e0e0;
}

.all-time-ogs-btn {
    background: linear-gradient(to right, #00F0FF, #00BFFF);
    border: none;
    color: #1a1a2e;
    font-family: 'Orbitron', sans-serif;
    font-size: 1em;
    padding: 12px 25px;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 0 15px rgba(0, 240, 255, 0.7);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    align-self: center;
}

.all-time-ogs-btn:hover {
    transform: scale(1.03);
    box-shadow: 0 0 20px rgba(0, 240, 255, 1);
}

.attachment-content {
    flex-grow: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 2;
    overflow-y: auto;
}

.attachment-categories {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.category-btn {
    background-color: rgba(0, 0, 0, 0.6);
    border: 1px solid #00F0FF;
    color: #00F0FF;
    font-family: 'Orbitron', sans-serif;
    font-size: 1em;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    margin: 0 5px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.category-btn:hover,
.category-btn.active {
    background-color: rgba(0, 240, 255, 0.2);
    border-color: #FFD700;
    color: #FFD700;
}

.attachment-filters {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-bottom: 20px;
}

.filter-dropdown {
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid #FFD700;
    color: #FFD700;
    padding: 8px 12px;
    border-radius: 5px;
    font-family: 'Roboto', sans-serif;
    font-size: 0.9em;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url('data:image/svg+xml;utf8,<svg fill="%23FFD700" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
    background-repeat: no-repeat;
    background-position: right 8px center;
    background-size: 16px;
}

.attachment-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
    flex-grow: 1;
    overflow-y: auto;
    padding-bottom: 20px;
}

.attachment-item {
    background-color: rgba(25, 25, 35, 0.7);
    border: 1px solid rgba(0, 240, 255, 0.3);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10px;
    position: relative;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.attachment-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 15px rgba(0, 240, 255, 0.7);
    border-color: #00F0FF;
}

.attachment-item.locked {
    filter: grayscale(80%) brightness(50%);
    pointer-events: none;
    border-color: rgba(255, 0, 0, 0.3);
}

.attachment-item.locked::after {
    content: 'LOCKED';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: #FF0000;
    padding: 5px 10px;
    border-radius: 3px;
    font-family: 'Orbitron', sans-serif;
    font-size: 1em;
    font-weight: bold;
    border: 1px solid #FF0000;
}

.attachment-image {
    width: 100%;
    height: 120px;
    object-fit: contain;
    border-bottom: 1px solid rgba(0, 240, 255, 0.2);
    margin-bottom: 8px;
}

.attachment-name {
    font-family: 'Orbitron', sans-serif;
    font-size: 1em;
    font-weight: bold;
    color: #FFD700;
    text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
    text-align: center;
    margin-bottom: 5px;
}

.attachment-rarity {
    font-size: 0.8em;
    font-weight: bold;
    padding: 3px 8px;
    border-radius: 3px;
    margin-bottom: 8px;
}

.attachment-rarity.common {
    background-color: #555;
    color: #eee;
}

.attachment-rarity.rare {
    background-color: #00BFFF;
    color: #1a1a2e;
}

.attachment-rarity.epic {
    background-color: #DA70D6;
    color: #1a1a2e;
}

.attachment-rarity.legendary {
    background-color: #FFD700;
    color: #1a1a2e;
}

.attachment-item .preview-btn,
.attachment-item .equip-btn {
    width: calc(100% - 20px);
    margin: 5px auto 0;
}


.wallet-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    display: none;
}

.wallet-modal-content {
    background-color: #1a1a2e;
    border: 2px solid #00F0FF;
    border-radius: 10px;
    padding: 30px;
    width: 90%;
    max-width: 500px;
    position: relative;
    box-shadow: 0 0 30px rgba(0, 240, 255, 0.8);
    text-align: center;
}

.modal-close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: #00F0FF;
    font-size: 2em;
    cursor: pointer;
    transition: color 0.2s ease;
}

.modal-close-btn:hover {
    color: #FFD700;
}

.wallet-modal-content h2 {
    font-family: 'Orbitron', sans-serif;
    color: #FFD700;
    margin-bottom: 25px;
    font-size: 2em;
}

.wallet-options {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 25px;
}

.web3-login-btn {
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid #00BFFF;
    color: #00BFFF;
    font-family: 'Roboto', sans-serif;
    font-size: 1.1em;
    padding: 12px 20px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease, border-color 0.3s ease;
}

.web3-login-btn:hover {
    background-color: rgba(0, 191, 255, 0.1);
    border-color: #00F0FF;
    color: #00F0FF;
}

.wallet-logo {
    width: 24px;
    height: 24px;
    margin-right: 10px;
}

.wallet-details {
    text-align: left;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.wallet-details p {
    font-size: 1em;
    color: #e0e0e0;
    margin-bottom: 10px;
}

.wallet-details span {
    font-weight: bold;
    color: #FFD700;
}

.wallet-tabs {
    display: flex;
    justify-content: space-around;
    margin-bottom: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.wallet-tab-btn {
    background: none;
    border: none;
    color: #00F0FF;
    font-family: 'Orbitron', sans-serif;
    font-size: 1em;
    padding: 10px 15px;
    cursor: pointer;
    transition: color 0.2s ease;
}

.wallet-tab-btn:hover,
.wallet-tab-btn.active {
    color: #FFD700;
    border-bottom: 2px solid #FFD700;
}

.nft-preview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 10px;
    margin-top: 15px;
}

.nft-preview-grid img {
    width: 100%;
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
    border: 1px solid rgba(0, 240, 255, 0.3);
}

.locked-feature,
.mockup-text {
    color: #FF4500;
    font-style: italic;
    margin: 20px 0;
}

.claim-btn {
    background: linear-gradient(to right, #FF4500, #FF6347);
    border: none;
    color: #fff;
    font-family: 'Orbitron', sans-serif;
    font-size: 1.1em;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(255, 69, 0, 0.6);
}

.claim-btn:disabled {
    background: #444;
    cursor: not-allowed;
    box-shadow: none;
}

.wallet-disconnect-btn {
    background: #dc3545;
    border: none;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    font-size: 0.9em;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.2s ease;
}

.wallet-disconnect-btn:hover {
    background-color: #c82333;
}
