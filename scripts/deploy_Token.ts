// scripts/deploy_Token.ts

import { ethers } from "hardhat";

async function main() {
  const initialSupply = 10000;
  const name =  "Token";
  const symbol = "T1"

  const GLDToken = await ethers.getContractFactory("Token");
  const token = await GLDToken.deploy(name, symbol, initialSupply);

  await token.waitForDeployment();

  const totalSupply = await token.totalSupply()

  console.log(
    `GLDToken deployed to ${await token.getAddress()} with an initialSupply ${totalSupply}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
