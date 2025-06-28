// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";
import "./FPToken.sol";
import "./RankBadge.sol";

contract ClaimManager is Ownable {
    FPToken public fpToken;
    RankBadge public rankBadge;
    address public alithOracle; // Keep public for reading
    mapping(address => mapping(uint256 => bool)) public claimed;
    uint256 public currentSeason;
    uint256 private nextRankBadgeTokenId;

    mapping(uint256 => address) public pendingAlithRequests;
    uint256 private nextRequestId;

    mapping(uint256 => string) public rankMetadataURIs;


    // --- Events ---
    event BadgeClaimed(address indexed player, uint256 season, uint256 xpBurned, uint256 tokenId);
    event SeasonAdvanced(uint256 newSeason);
    event AlithSet(address newAlith); // Still useful for constructor event
    event KarmaEvaluationRequested(uint256 indexed requestId, address indexed player, string playerDataUrl, bytes32 playerDataHash);


    // MODIFIED CONSTRUCTOR: Now accepts _alithOracle as a parameter
    constructor(address initialOwner, address _fpToken, address _rankBadge, address _alithOracle)
        Ownable(initialOwner)
    {
        require(_fpToken != address(0), "ClaimManager: FPToken address cannot be zero");
        require(_rankBadge != address(0), "ClaimManager: RankBadge address cannot be zero");
        require(_alithOracle != address(0), "ClaimManager: Alith oracle cannot be zero address"); // Add this check
        fpToken = FPToken(_fpToken);
        rankBadge = RankBadge(_rankBadge);
        alithOracle = _alithOracle; // Set alithOracle here directly
        currentSeason = 1;
        nextRankBadgeTokenId = 1;
        nextRequestId = 1;
        emit AlithSet(_alithOracle); // Emit event for consistency
        console.log("ClaimManager: Constructor called. Alith Oracle set to:", _alithOracle);
    }

    // REMOVED: The previous setAlith function is no longer needed as alithOracle is set in the constructor.
    // Make sure this function is NOT present in your ClaimManager.sol file anymore.
    /*
    function setAlith(address _oracle) public onlyOwner {
        require(_oracle != address(0), "ClaimManager: Alith oracle cannot be zero address");
        alithOracle = _oracle;
        emit AlithSet(_oracle);
        console.log("ClaimManager: setAlith called. Received _oracle:", _oracle);

        // Transfer RankBadge ownership to the Alith oracle address
        console.log("ClaimManager: Attempting to transfer RankBadge ownership to:", _oracle);
        // rankBadge.transferOwnership(_oracle); // This line caused the previous issue
        console.log("ClaimManager: RankBadge ownership transfer initiated to:", _oracle);
    }
    */

    function newSeason() public onlyOwner {
        currentSeason++;
        emit SeasonAdvanced(currentSeason);
        console.log("ClaimManager: newSeason called by owner.");
    }

    function requestKarmaEvaluation(string memory _playerDataUrl, bytes32 _playerDataHash) public {
        uint256 currentRequestId = nextRequestId;
        pendingAlithRequests[currentRequestId] = msg.sender;
        nextRequestId++;

        emit KarmaEvaluationRequested(currentRequestId, msg.sender, _playerDataUrl, _playerDataHash);
        console.log("ClaimManager: Karma evaluation requested for player: %s with data: %s", msg.sender, _playerDataUrl);
    }

    function claimBadge(address _player, uint256 _xpCost, string memory _badgeURI) public {
        require(msg.sender == alithOracle, "ClaimManager: Not Alith Oracle authorized for claims");
        require(!claimed[_player][currentSeason], "ClaimManager: Already claimed for this season");
        require(fpToken.balanceOf(_player) >= _xpCost, "ClaimManager: Insufficient XP");

        console.log("ClaimManager: claimBadge called by Alith for player:", _player);
        console.log("xpCost:", _xpCost);

        fpToken.burnSeasonXP(_player, _xpCost);

        uint256 newBadgeTokenId = nextRankBadgeTokenId;
        nextRankBadgeTokenId++;

        rankBadge.mintBadge(_player, newBadgeTokenId, _badgeURI);

        claimed[_player][currentSeason] = true;
        emit BadgeClaimed(_player, currentSeason, _xpCost, newBadgeTokenId);
        console.log("ClaimManager: Badge claimed and XP burned for player: %s. Token ID: %s", _player, newBadgeTokenId);
    }

    function setRankMetadataURI(uint256 _rank, string memory _uri) public onlyOwner {
        require(_rank > 0, "ClaimManager: Rank must be greater than 0");
        rankMetadataURIs[_rank] = _uri;
        console.log("ClaimManager: Metadata URI set for Rank %s: %s", _rank, _uri);
    }

    function getRankMetadataURI(uint256 _rank) public view returns (string memory) {
        return rankMetadataURIs[_rank];
    }

    // These setter functions remain, as they might be needed for upgrades or re-configurations later
    function setFPTokenAddress(address _newFPTokenAddress) public onlyOwner {
        require(_newFPTokenAddress != address(0), "ClaimManager: FPToken address cannot be zero");
        fpToken = FPToken(_newFPTokenAddress);
    }

    function setRankBadgeAddress(address _newRankBadgeAddress) public onlyOwner {
        require(_newRankBadgeAddress != address(0), "ClaimManager: RankBadge address cannot be zero");
        rankBadge = RankBadge(_newRankBadgeAddress);
    }
}