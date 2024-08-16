import { Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: 'xyb5LoDZ_CuuiLCaMOOI5qhUiVxEM_dh', // Your API key here
  network: 'base-mainnet', // Or the appropriate network
};

const alchemy = new Alchemy(settings);

// Example function to fetch NFTs
async function getAllNFTs() {
  const nfts = await alchemy.nft.getNftsForOwner("0xYourWalletAddressHere");
  console.log(nfts);
}
