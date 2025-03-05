import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    custom: {
      url: process.env.CUSTOM_URL || "https://opbnb-testnet-rpc.bnbchain.org",
      chainId: 5611,
      accounts: process.env.NEXT_PUBLIC_PRIVATE_KEY !== undefined ? [process.env.NEXT_PUBLIC_PRIVATE_KEY] : [],
    },
  },
};

export default config;
