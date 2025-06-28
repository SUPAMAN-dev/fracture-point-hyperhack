// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24; // Updated pragma to match your current code

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol"; // Added for debugging, very useful during development

contract RankBadge is ERC721URIStorage, Ownable {
    // --- NEW ADDITIONS START ---

    // 1. New State Variable: claimManagerContract
    // This variable will store the address of your ClaimManager contract.
    // It's crucial because we'll use this address to authorize calls to mintBadge.
    address public claimManagerContract;

    // 2. New Event: ClaimManagerSet
    // Events are good practice for transparency. This event will be emitted
    // whenever the 'claimManagerContract' address is set.
    event ClaimManagerSet(address newClaimManager);

    // 3. New Modifier: onlyClaimManager
    // This modifier restricts a function's execution to only the address stored in
    // 'claimManagerContract'. This is how we grant specific permission to ClaimManager.
    modifier onlyClaimManager() {
        require(msg.sender == claimManagerContract, "RankBadge: Not authorized (ClaimManager only)");
        _; // The '_' tells Solidity to execute the function code after the check
    }

    // 4. New Function: setClaimManagerContract
    // This function allows the owner of the RankBadge contract (initially the deployer)
    // to set the address of the ClaimManager contract. This must be called after
    // ClaimManager is deployed and before it tries to mint badges.
    function setClaimManagerContract(address _claimManager) public onlyOwner {
        require(_claimManager != address(0), "RankBadge: ClaimManager cannot be zero address");
        claimManagerContract = _claimManager;
        emit ClaimManagerSet(_claimManager);
        console.log("RankBadge: ClaimManager contract set to:", _claimManager); // For debugging
    }

    // --- NEW ADDITIONS END ---


    uint256 private _tokenIds; // This was already in your code, keeping it for unique IDs

    // --- REMOVED OR MODIFIED: The 'hasClaimed' mapping is no longer needed here ---
    // Reason: The logic for checking if a player has already claimed for the *current season*
    // belongs in the ClaimManager contract, not in the RankBadge. RankBadge should simply
    // mint if told to by an authorized entity (ClaimManager). This also allows the same
    // player to receive different badges (with different token IDs) in different seasons
    // if ClaimManager allows it, without RankBadge itself restricting it permanently.
    // mapping(address => bool) public hasClaimed; // REMOVED THIS LINE


    constructor()
        ERC721("Fracture Point Rank Badge", "FPRB")
        Ownable(msg.sender)
    {
        // Owner is the deployer initially.
        // In your test setup, ownership will be transferred to ClaimManager,
        // and then from ClaimManager to the Alith Oracle.
        // The important part is that ClaimManager now has a *separate* authorization
        // to mint badges via the 'onlyClaimManager' modifier.
    }

    // --- MODIFIED FUNCTION: mintBadge ---
    // 1. Changed 'external onlyOwner' to 'public onlyClaimManager'.
    //    This is the core change: only the designated ClaimManager contract can call this.
    // 2. Removed the 'require(!hasClaimed[player], "Badge already claimed");' line
    //    as 'hasClaimed' logic is now handled in ClaimManager.
    // 3. Added '_tokenId' parameter and explicitly passed it to _mint and _setTokenURI.
    //    This is because ClaimManager will now manage the unique ID generation.
    function mintBadge(address player, uint256 tokenId, string memory metadataURI) public onlyClaimManager returns (uint256) {
        // The check for "Badge already claimed" for the current season is now handled
        // within the ClaimManager contract, before it calls this function.

        // We no longer rely on _tokenIds++ here for generating unique IDs within RankBadge,
        // as ClaimManager will be providing the unique tokenId.
        // _tokenIds++; // REMOVED
        // uint256 newItemId = _tokenIds; // REMOVED

        _mint(player, tokenId); // Use the tokenId passed in from ClaimManager
        _setTokenURI(tokenId, metadataURI); // Use the tokenId passed in from ClaimManager
        // hasClaimed[player] = true; // REMOVED - handled by ClaimManager

        console.log("RankBadge: Minted badge ID %s to %s with URI %s", tokenId, player, metadataURI); // For debugging
        return tokenId; // Return the tokenId that was minted
    }
}