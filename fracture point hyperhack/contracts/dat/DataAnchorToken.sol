// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract DataAnchorToken is ERC1155, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    event TokenMinted(address indexed to, uint256 indexed tokenId, string tokenURI);

    // Token ID => metadata URI
    mapping(uint256 => string) private _tokenURIs;
    // Token ID => verified status
    mapping(uint256 => bool) private _tokenVerified;

    uint256 private _tokenIdCounter;

    constructor(address admin_) ERC1155("") {
        _grantRole(DEFAULT_ADMIN_ROLE, admin_);
        _grantRole(MINTER_ROLE, admin_);
    }

    function mint(address to, uint256 amount, string memory tokenURI_, bool verified_) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = ++_tokenIdCounter;
        _mint(to, tokenId, amount, "");
        _setTokenURI(tokenId, tokenURI_);
        setTokenVerified(tokenId, verified_);
        emit TokenMinted(to, tokenId, tokenURI_);
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "DataAnchorToken: non-existent token");
        return _tokenURIs[tokenId];
    }

    function verified(uint256 tokenId) public view returns (bool) {
        require(_exists(tokenId), "DataAnchorToken: non-existent token");
        return _tokenVerified[tokenId];
    }

    function _setTokenURI(uint256 tokenId, string memory tokenURI_) internal {
        _tokenURIs[tokenId] = tokenURI_;
    }

    function setTokenVerified(uint256 tokenId, bool verified_) public onlyRole(MINTER_ROLE) {
        require(_exists(tokenId), "DataAnchorToken: non-existent token");
        _tokenVerified[tokenId] = verified_;
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return bytes(_tokenURIs[tokenId]).length > 0;
    }

    function batchMint(address to, uint256[] memory ids, uint256[] memory amounts, string[] memory tokenURIs)
        public
        onlyRole(MINTER_ROLE)
    {
        require(ids.length == amounts.length, "DataAnchorToken: arrays length mismatch");
        require(ids.length == tokenURIs.length, "DataAnchorToken: arrays length mismatch");

        for (uint256 i = 0; i < ids.length; i++) {
            uint256 tokenId = ids[i];
            _mint(to, tokenId, amounts[i], "");
            _setTokenURI(tokenId, tokenURIs[i]);
        }
    }

    function currentTokenId() public view returns (uint256) {
        return _tokenIdCounter;
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC1155, AccessControl) returns (bool) {
        return ERC1155.supportsInterface(interfaceId) || AccessControl.supportsInterface(interfaceId);
    }
}
