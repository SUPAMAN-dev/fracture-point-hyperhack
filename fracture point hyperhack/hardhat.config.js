// hardhat.config.js

// Ensure dotenv is loaded first to make environment variables available
// This allows you to use process.env.YOUR_VAR in your config
require('dotenv').config();

// Hardhat's core plugin for common tasks, testing, and deployment
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // Define your Solidity compiler configuration
  solidity: {
    version: "0.8.24", // Make sure this matches the pragma in your .sol files
    settings: {
      optimizer: {
        enabled: true, // Enable the Solidity optimizer
        runs: 200,     // The number of times the optimizer will run (common value)
      },
    },
  },

  // Define your network configurations
  networks: {
    // Default Hardhat Network for fast, in-memory testing
    // You typically don't need to specify much here unless you're doing advanced things like forking
    hardhat: {
      // Nothing specific needed here for basic local testing
    },
    // Localhost network for connecting to a persistent Hardhat node run manually (e.g., npx hardhat node)
    localhost: {
      url: "http://127.0.0.1:8545", // Default URL for a Hardhat node
      // You can add accounts here if you want to use specific private keys for local testing,
      // otherwise, Hardhat provides 20 default accounts.
    },
    // Hyperion Testnet Configuration
    hyperionTestnet: {
      // The RPC URL for Hyperion Testnet.
      // It tries to use the environment variable HYPERION_RPC_URL first,
      // and falls back to the direct URL if the environment variable is not set.
      url: process.env.HYPERION_RPC_URL || "https://hyperion-testnet.metisdevops.link",
      chainId: 133717, // The Chain ID specific to Hyperion Testnet
      // The private key(s) used for signing transactions on this network.
      // It retrieves the PRIVATE_KEY from your .env file.
      // The ternary operator `? [process.env.PRIVATE_KEY] : []` ensures that
      // if PRIVATE_KEY is not defined, it defaults to an empty array,
      // preventing a potential error.
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      // Explicitly setting gasPrice is often good practice for L2s like Metis
      // 1 Gwei = 1,000,000,000 wei. This value should be suitable for Hyperion.
      // You might adjust this slightly based on actual network conditions if transactions get stuck.
      gasPrice: 1000000000, 
    },
    // You can add more testnets (e.g., Sepolia, Arbitrum Sepolia, Polygon Amoy) or mainnets here if needed.
    // Example for Sepolia (requires SEPOLIA_RPC_URL and another PRIVATE_KEY for Sepolia in .env):
    // sepolia: {
    //   url: process.env.SEPOLIA_RPC_URL || "",
    //   accounts: process.env.PRIVATE_KEY_SEPOLIA ? [process.env.PRIVATE_KEY_SEPOLIA] : [],
    //   chainId: 11155111,
    // },
  },

  // Optional: Etherscan verification configuration
  // This section is for verifying your contract's source code on a block explorer.
  // Not strictly necessary for deployment, but highly recommended for public testnets.
  // You would need to check if Hyperion Testnet's explorer (metisdevops.link)
  // supports an Etherscan-compatible verification API.
  // If it does, you'll need an API key from their explorer if required.
  // etherscan: {
  //   apiKey: {
  //     // You would replace 'hyperionTestnet' with the key used in customChains
  //     hyperionTestnet: process.env.METIS_EXPLORER_API_KEY || "", // Add METIS_EXPLORER_API_KEY to your .env
  //   },
  //   customChains: [
  //     {
  //       network: "hyperionTestnet", // This key must match the network name above
  //       chainId: 133717,
  //       urls: {
  //         api: "https://hyperion-testnet-explorer.metisdevops.link/api", // This is often the /api endpoint for verification
  //         browser: "https://hyperion-testnet-explorer.metisdevops.link",
  //       },
  //     },
  //   ],
  // },

  // You can add other configurations like path overrides, gas reporting, etc.
};