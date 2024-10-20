import { expect } from 'chai';
import pkg from "hardhat";
const { ethers } = pkg;

describe("Land Title Registry", function () {
  let LandTitleRegistry, landTitleRegistry, Login, login, TitleDeedTokenization, tokenization;

  beforeEach(async function () {
    // Deploy Login contract
    Login = await ethers.getContractFactory("Login");
    login = await Login.deploy();
    await login.deployed();

    // Deploy Land Title Registry contract
    LandTitleRegistry = await ethers.getContractFactory("LandTitleRegistry");
    landTitleRegistry = await LandTitleRegistry.deploy();
    await landTitleRegistry.deployed();

    // Deploy Tokenization contract
    TitleDeedTokenization = await ethers.getContractFactory("TitleDeedTokenization");
    tokenization = await TitleDeedTokenization.deploy(landTitleRegistry.address);
    await tokenization.deployed();
  });

  it("Should register a land title", async function () {
    await landTitleRegistry.registerLandTitle(1, "0xYourAddress", "Location", 1000, "documentHash");
    const details = await landTitleRegistry.getLandDetails(1);

    expect(details.isRegistered).to.be.true;
    expect(details.ownerAddress).to.equal("0xYourAddress");
    expect(details.location).to.equal("Location");
    expect(details.area).to.equal(1000);
    expect(details.documentHash).to.equal("documentHash");
  });

  // Additional tests for TitleDeedTokenization contract
  it("Should mint a new token by converting a scanned document", async function () {
    // Simulate a scanned document
    const scannedDocument = "scannedDocumentHash";

    // Mint a new token by converting the scanned document
    await tokenization.mintToken("0xYourAddress", scannedDocument);

    // Verify that the token was minted successfully
    const documentHash = await tokenization.getDocumentHash(0);
    expect(documentHash).to.equal(scannedDocument);
  });

  it("Should get document hash of a token", async function () {
    // Simulate a scanned document
    const scannedDocument = "scannedDocumentHash";

    // Mint a new token by converting the scanned document
    await tokenization.mintToken("0xYourAddress", scannedDocument);

    // Verify that the document hash is correctly stored
    const documentHash = await tokenization.getDocumentHash(0);
  expect(documentHash).to.equal(scannedDocument);
  });

  // Additional tests for Login contract
  it("Should register a user", async function () {
    await login.register();
    const isRegistered = await login.isUserRegistered();
    expect(isRegistered).to.be.true;
  });

  it("Should verify if the caller is registered", async function () {
    await login.register();
    const isRegistered = await login.isUserRegistered();
    expect(isRegistered).to.be.true;
  });
});