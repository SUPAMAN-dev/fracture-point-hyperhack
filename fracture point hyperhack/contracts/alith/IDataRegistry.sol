// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.13;

// Assuming these OpenZeppelin imports are present
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol"; // If it uses IERC20

// --- CORRECTED IMPORTS BELOW ---
import {IVerifiedComputing} from "./IVerifiedComputing.sol"; // Corrected: Direct import, as it's in the same folder!
import {DataAnchorToken} from "../dat/DataAnchorToken.sol"; // Corrected: one ../

// Assuming IDataRegistry is an interface or a contract
interface IDataRegistry {
    // ... (rest of your IDataRegistry.sol code here) ...
    // Make sure to add the 'DataAnchorToken' and 'IVerifiedComputing' interfaces/contracts if they are not already defined.

    // Example functions (if your IDataRegistry has them)
    // function registerData(bytes32 dataHash, string memory metadataURI) external;
    // function getDataInfo(bytes32 dataHash) external view returns (address uploader, uint256 timestamp, string memory metadataURI);

}