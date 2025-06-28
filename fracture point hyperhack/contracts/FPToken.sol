// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol"; // Import console.log for debugging

contract FPToken is ERC20, Ownable {
    // alithOracle: The address authorized to distribute Rift XP and perform certain Alith-only actions.
    address public alithOracle;

    // claimManagerContract: The address of the ClaimManager contract,
    // explicitly authorized to burn XP for badge claims.
    address public claimManagerContract;

    // Events for better transparency
    event AlithSet(address newAlith);
    event ClaimManagerSet(address newClaimManager);
    event RiftXPDistributed(address winner, address firstExtraction, address secondExtraction);
    event XPBurned(address player, uint256 amount);

    // Modifier to restrict functions to the designated Alith Oracle.
    modifier onlyAlith() {
        require(msg.sender == alithOracle, "FPToken: Not authorized (Alith only)");
        _;
    }

    // Modifier to restrict functions to either the Alith Oracle or the ClaimManager contract.
    // This is crucial for the ClaimManager to be able to burn XP.
    modifier onlyAlithOrClaimManager() {
        require(msg.sender == alithOracle || msg.sender == claimManagerContract, "FPToken: Not authorized (Alith or ClaimManager only)");
        _;
    }

    // MODIFIED CONSTRUCTOR: Now accepts initialOwner AND _alithOracle as parameters
    constructor(address initialOwner, address _alithOracle)
        ERC20("FuturePoint Token", "FPXP")
        Ownable(initialOwner) // Sets the deployer as the initial owner
    {
        require(_alithOracle != address(0), "FPToken: Alith oracle cannot be zero address");
        alithOracle = _alithOracle; // Set alithOracle here directly
        emit AlithSet(_alithOracle); // Emit event for visibility
        console.log("FPToken: Constructor called. Alith Oracle set to:", _alithOracle);
    }

    // REMOVED: The previous setAlith function is no longer needed as alithOracle is set in the constructor.
    // Make sure this function is NOT present in your FPToken.sol file anymore.
    /*
    function setAlith(address _alith) public onlyOwner {
        require(_alith != address(0), "FPToken: Alith cannot be zero address");
        alithOracle = _alith;
        emit AlithSet(_alith);
        console.log("FPToken: alithOracle set to:", _alith);
    }
    */

    /**
     * @dev Sets the address of the ClaimManager contract.
     * This function can only be called by the contract owner.
     * This is necessary to grant ClaimManager permission to burn XP.
     * @param _claimManager The address of the ClaimManager contract.
     */
    function setClaimManagerContract(address _claimManager) public onlyOwner {
        require(_claimManager != address(0), "FPToken: ClaimManager cannot be zero address");
        claimManagerContract = _claimManager;
        emit ClaimManagerSet(_claimManager);
        console.log("FPToken: ClaimManager contract set to:", _claimManager);
    }

    /**
     * @dev Distributes XP for a Rift event to a winner and two extraction players.
     * Only the Alith Oracle can call this function.
     * @param _winner The address of the winning player.
     * @param _firstExtraction The address of the player with the first extraction.
     * @param _secondExtraction The address of the player with the second extraction.
     */
    function distributeRiftXP(
        address _winner,
        address _firstExtraction,
        address _secondExtraction
    ) public onlyAlith { // This remains 'onlyAlith' as the oracle directly calls it
        _mint(_winner, 50 ether); // Example amounts
        _mint(_firstExtraction, 30 ether);
        _mint(_secondExtraction, 20 ether);
        emit RiftXPDistributed(_winner, _firstExtraction, _secondExtraction);
        console.log("FPToken: XP minted for Rift.");
    }

    /**
     * @dev Burns a specified amount of XP from a player's balance.
     * This function can be called by either the Alith Oracle or the ClaimManager contract.
     * This allows ClaimManager to burn XP during badge claims.
     * @param _player The address of the player whose XP will be burned.
     * @param _amount The amount of XP to burn.
     */
    function burnSeasonXP(address _player, uint256 _amount) public onlyAlithOrClaimManager {
        require(balanceOf(_player) >= _amount, "FPToken: Insufficient XP");
        _burn(_player, _amount);
        emit XPBurned(_player, _amount);
        console.log("FPToken: burnSeasonXP called by %s for player: %s amount: %s", msg.sender, _player, _amount);
    }

    /**
     * @dev Overrides the internal _update function from ERC20 to restrict token transfers.
     * Transfers are generally disabled, allowing only minting (handled by _mint in distributeRiftXP)
     * and burning (handled by _burn in burnSeasonXP).
     * The override also ensures that XP can be moved (burned) when initiated by the Alith Oracle or ClaimManager,
     * or when XP is simply removed from circulation (to address(0)).
     */
    function _update(address from, address to, uint256 value) internal override {
        // Prevent direct transfers between users.
        // Allow minting (from address(0)) and burning (to address(0)).
        // Also allow transfers initiated by the Alith Oracle or ClaimManager (for burning/internal logic).
        if (from != address(0) && to != address(0)) {
            require(msg.sender == alithOracle || msg.sender == claimManagerContract, "FPToken: Transfers disabled (except for burning)");
        }
        super._update(from, to, value);
    }
}