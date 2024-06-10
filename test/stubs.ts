import { parseUnits } from "ethers/lib/utils";
import { deployContract } from "ethereum-waffle";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import RevolonArtifact from "../artifacts/contracts/Revolon.sol/Revolon.json";

export async function deployRevolon(deployer: any, wallet0: SignerWithAddress): Promise<any> {

  const revolon = await deployContract(deployer, RevolonArtifact, [
    [wallet0.address],
    [parseUnits("5000", "18")],
  ]);

  return revolon;
}
