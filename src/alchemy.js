import { Alchemy } from 'alchemy-sdk';
import { ethers } from 'ethers';

// Configure the Alchemy SDK settings
const settings = {
  apiKey: 'xyb5LoDZ_CuuiLCaMOOI5qhUiVxEM_dh', // Your API key here
  network: 'base-mainnet', // Specify the correct network
};

// Initialize the Alchemy instance
const alchemy = new Alchemy(settings);

// Function to connect to MetaMask and fetch NFTs for the connected wallet
async function connectAndFetchNFTs() {
  try {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Create an ethers.js provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Get the connected wallet address
      const walletAddress = await signer.getAddress();

      console.log("Connected wallet address:", walletAddress);

      // Fetch NFTs for the connected wallet address using Alchemy SDK
      const nfts = await alchemy.nft.getNftsForOwner(walletAddress);
      console.log("NFTs for connected wallet:", nfts);
    } else {
      console.error('MetaMask is not installed. Please install it to use this app.');
    }
  } catch (error) {
    console.error("Error connecting to MetaMask or fetching NFTs:", error);
  }
}

// Call the function to connect to MetaMask and fetch NFTs
connectAndFetchNFTs();
