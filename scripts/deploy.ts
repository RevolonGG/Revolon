// We require the Hardhat Runtime Environment explicitly here. This is optional but useful for running the
// script in a standalone fashion through `node <script>`. When running the script with `hardhat run <script>`,
// you'll find the Hardhat Runtime Environment's members available in the global scope.
import hre from "hardhat";
import { ethers } from "hardhat";
import { BigNumberish } from "ethers";
import { parseUnits } from "ethers/lib/utils";

import { Contract, ContractFactory } from "@ethersproject/contracts";

async function main(): Promise<void> {
  const [wallet] = await ethers.getSigners();
  const Revolon: ContractFactory = await ethers.getContractFactory("Revolon");

  // change addresses for mainnet
  let vestingAddresses: string[] = [
    "0xa0e9E6B79a3e1AB87FeB209567eF3E0373210a89",
    "0x522A02DE738e7BFca3866086e8429851f4bFCB83",
    "0x476267c458deE06A515Fdcb5AbFD582F125e881F",
    "0xbC8ae4Df25835E7dc93b56ee073D7fE780EaD36a",
    "0x50620F4F3Ba97B782e0E05E7669ab794Fadf6293",
  ];

  // change amounts for mainnet
  let vestingAmounts: BigNumberish[] = [
    parseUnits("5000", "18"),
    parseUnits("5000", "18"),
    parseUnits("5000", "18"),
    parseUnits("5000", "18"),
    parseUnits("5000", "18"),
  ];

  const revolon: Contract = await Revolon.deploy(vestingAddresses, vestingAmounts);

  await revolon.deployed();

  console.log("Revolon token deployed to ->", revolon.address);

  delay(60000);

  await hre.run("verify:verify", {
    address: revolon.address,
    constructorArguments: [
      vestingAddresses,
      vestingAmounts
    ],
  });
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// We recommend this pattern to be able to use async/await everywhere and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
