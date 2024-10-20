/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 31337,
      gas: 12000000,
      blockGasLimit: 0x1fffffffffffff,
    },
  },
};
