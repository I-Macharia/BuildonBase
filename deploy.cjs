const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy Login contract
  const Login = await hre.ethers.getContractFactory("Login");
  const login = await Login.deploy();
  await login.deployed();
  console.log("Login deployed to:", login.address);

  // Deploy LandTitleRegistry contract
  const LandTitleRegistry = await hre.ethers.getContractFactory("LandTitleRegistry");
  const landTitleRegistry = await LandTitleRegistry.deploy();
  await landTitleRegistry.deployed();
  console.log("LandTitleRegistry deployed to:", landTitleRegistry.address);

  // Deploy TitleDeedTokenization contract
  const TitleDeedTokenization = await hre.ethers.getContractFactory("TitleDeedTokenization");
  const titleDeedTokenization = await TitleDeedTokenization.deploy(landTitleRegistry.address);
  await titleDeedTokenization.deployed();
  console.log("TitleDeedTokenization deployed to:", titleDeedTokenization.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });