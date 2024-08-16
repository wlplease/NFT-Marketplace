require("dotenv").config();
const { Alchemy, Wallet, Utils } = require("alchemy-sdk");
const fs = require("fs");

async function main() {
  // Alchemy configuration
  const settings = {
    apiKey: process.env.ALCHEMY_API_KEY, // Your Alchemy API Key
    network: "eth-mainnet", // Use the appropriate network, e.g., eth-goerli, eth-mainnet
  };
  const alchemy = new Alchemy(settings);

  // Set up wallet using the private key from environment variables
  const wallet = new Wallet(process.env.PRIVATE_KEY, alchemy);

  // Read and compile the contract
  const contractJson = JSON.parse(fs.readFileSync('./artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json', 'utf8'));
  const factory = new alchemy.eth.ContractFactory(contractJson.abi, contractJson.bytecode, wallet);

  // Deploy the contract
  const contract = await factory.deploy();
  await contract.deployed();

  console.log("Marketplace deployed to:", contract.address);

  // Prepare contract data to save to Marketplace.json
  const data = {
    address: contract.address,
    abi: contractJson.abi,
  };

  // Save the ABI and address to Marketplace.json
  const outputDir = './src';
  const outputFile = `${outputDir}/Marketplace.json`;

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  console.log("Marketplace ABI and address saved to:", outputFile);

  // Optional: Git commit and push changes
  const { exec } = require("child_process");

  exec("git add . && git commit -m 'Deployed contract and updated Marketplace.json' && git push", (error, stdout, stderr) => {
    if (error) {
      console.error(`Git error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Git stderr: ${stderr}`);
      return;
    }
    console.log(`Git stdout: ${stdout}`);
  });

  // Optional: Trigger Netlify build
  const NETLIFY_BUILD_HOOK_URL = process.env.NETLIFY_BUILD_HOOK_URL; // Ensure to add your Netlify hook URL in .env
  if (NETLIFY_BUILD_HOOK_URL) {
    exec(`curl -X POST -d {} ${NETLIFY_BUILD_HOOK_URL}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Netlify build trigger error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Netlify build trigger stderr: ${stderr}`);
        return;
      }
      console.log(`Netlify build triggered: ${stdout}`);
    });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
