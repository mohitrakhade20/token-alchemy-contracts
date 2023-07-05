// We import Chai to use its asserting functions here.
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Token", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.

    const initialSupply = 10000;

    async function deployGLDTokenFixture() {

      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();

      const GLDToken = await ethers.getContractFactory("Token");
      const token = await GLDToken.deploy("TEST","TEST",initialSupply);

      return { token, owner, otherAccount };
    }

    describe("Deployment", function () {
      it("Should assign the total supply of tokens to the owner", async function () {
        const { token, owner } = await loadFixture(deployGLDTokenFixture);
        const total = await token.totalSupply();
        expect(total).to.equal(await token.balanceOf(owner.address));
      });

    });

    describe("Transaction", function () {

        it("Should transfer tokens between accounts", async function () {
            const { token, owner, otherAccount } = await loadFixture(deployGLDTokenFixture);

            const ownerBalance = await token.balanceOf(owner.address);

            await token.transfer(otherAccount.address, 50);
            const addr1Balance = await token.balanceOf(otherAccount.address);
            expect(addr1Balance).to.equal(50);

            const ownerNewBalance = await token.balanceOf(owner.address);
            expect(ownerNewBalance).to.equal(ownerBalance.sub(50));
        });

        it("Should fail if sender doesn’t have enough tokens", async function () {
            const { token, owner, otherAccount } = await loadFixture(deployGLDTokenFixture);

            // Transfer 10001 GLD tokens from owner to otherAccount
            await expect(
             token.transfer(otherAccount.address, ethers.utils.parseEther('10001'))
            ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
        });        

      });

});
