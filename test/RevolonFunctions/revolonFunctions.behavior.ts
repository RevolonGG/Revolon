import { expect } from "chai";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import {
  defaultAbiCoder,
  keccak256,
  toUtf8Bytes,
  parseUnits,
} from "ethers/lib/utils";

export async function shouldBehaveLikeRevolonFunctions(
  rvlnToken: Contract,
  wallet0: SignerWithAddress,
  wallet1: SignerWithAddress,
): Promise<void> {
  const NAME_HASH: string = "0x5ba607291b5fb10f4b5ab030620ffcacdcd9d87f7d6d9b19bcb94643d547ce77";
  const VERSION_HASH: string = "0xc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6";
  const EIP712DOMAIN_HASH: string =
    "0x8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f";
  describe("Revolon FUNCTIONS", async () => {
    it("Validates the name of token", async () => {
      expect(await rvlnToken.name()).to.be.equal("Revolon");
    });

    it("Validates the symbol of token", async () => {
      expect(await rvlnToken.symbol()).to.be.equal("RPM");
    });

    it("Validates the decimal of token", async () => {
      expect(await rvlnToken.decimals()).to.be.equal(18);
    });

    it("Validates total supply after mint", async () => {
      expect(await rvlnToken.totalSupply()).to.be.equal(parseUnits("5000", "18"));
    });

    it("Validates total supply after burn", async () => {
      await rvlnToken.burn(parseUnits("1000", "18"));

      expect(await rvlnToken.totalSupply()).to.be.equal(parseUnits("4000", "18"));
    });

    it("Validates name hash", async () => {
      expect(keccak256(toUtf8Bytes("Revolon"))).to.be.equal(NAME_HASH);
    });

    it("Validates version hash", async () => {
      expect(keccak256(toUtf8Bytes("1"))).to.be.equal(VERSION_HASH);
    });

    it("Validates domain seperator", async () => {
      expect(await rvlnToken.getDomainSeparator()).to.be.equal(
        keccak256(
          defaultAbiCoder.encode(
            ["bytes32", "bytes32", "bytes32", "uint256", "address"],
            [
              EIP712DOMAIN_HASH,
              NAME_HASH,
              VERSION_HASH,
              await rvlnToken.getChainId(),
              rvlnToken.address,
            ],
          ),
        ),
      );
    });

    it("Approves the tokens", async () => {
      await rvlnToken.approve(wallet1.address, parseUnits("2000", "18"));
      expect(await rvlnToken.allowance(wallet0.address, wallet1.address)).to.be.equal(
        parseUnits("2000", "18"),
      );
    });
  });
}
