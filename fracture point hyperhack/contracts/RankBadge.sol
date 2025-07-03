// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24; // Updated pragma to match your current code

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol"; // Added for debugging, very useful during development

contract RankBadge is ERC721URIStorage, Ownable {
  

    //  claimManagerContract
    // This variable will store the address of your ClaimManager contract.
    // It's crucial because we'll use this address to authorize calls to mintBadge.
    address public claimManagerContract;

    // ClaimManagerSet
    // Events are good practice for transparency. This event will be emitted
    // whenever the 'claimManagerContract' address is set.
    event ClaimManagerSet(address newClaimManager);

    //  onlyClaimManager
    // This modifier restricts a function's execution to only the address stored in
    // 'claimManagerContract'. This is how we grant specific permission to ClaimManager.
    modifier onlyClaimManager() {
        require(msg.sender == claimManagerContract, "RankBadge: Not authorized (ClaimManager only)");
        _; // The '_' tells Solidity to execute the function code after the check
    }

    //  setClaimManagerContract
    // This function allows the owner of the RankBadge contract (initially the deployer)
    // to set the address of the ClaimManager contract. This must be called after
    // ClaimManager is deployed and before it tries to mint badges.
    function setClaimManagerContract(address _claimManager) public onlyOwner {
        require(_claimManager != address(0), "RankBadge: ClaimManager cannot be zero address");
        claimManagerContract = _claimManager;
        emit ClaimManagerSet(_claimManager);
        console.log("RankBadge: ClaimManager contract set to:", _claimManager); // For debugging
    }

  


    uint256 private _tokenIds; 

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

    
    function mintBadge(address player, uint256 tokenId, string memory metadataURI) public onlyClaimManager returns (uint256) {
         
        _mint(player, tokenId); // Use the tokenId passed in from ClaimManager
        _setTokenURI(tokenId, metadataURI); // Use the tokenId passed in from ClaimManager
    

        console.log("RankBadge: Minted badge ID %s to %s with URI %s", tokenId, player, metadataURI); // For debugging
        return tokenId; // Return the tokenId that was minted
    }
}