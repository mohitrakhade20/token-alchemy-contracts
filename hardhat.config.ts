import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.16",
  // networks: {
  //   sepolia: {
  //     url: "https://eth-sepolia.g.alchemy.com/v2/<apikey>",
  //     accounts: []
  //   }
  // },
};

export default config;
