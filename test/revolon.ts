import hre from "hardhat";
import { use } from "chai";
import { Contract } from "ethers";
import { solidity } from "ethereum-waffle";
import { deployRevolon } from "./stubs";
import { shouldBehaveLikeRevolonFunctions } from "./RevolonFunctions/revolonFunctions.behavior";

use(solidity);

describe("Initiating Test Suite", async () => {
  let revolonToken: Contract;

  beforeEach("Calling the functions", async () => {
    const [wallet0, wallet1] = await hre.ethers.getSigners();

    revolonToken = await deployRevolon(wallet0, wallet0);
  });

  describe("Running the contract functions", async () => {
    it("Runs the Revolon functions", async () => {
      const [wallet0, wallet1] = await hre.ethers.getSigners();

      await shouldBehaveLikeRevolonFunctions(revolonToken, wallet0, wallet1);
    });
  });
});
