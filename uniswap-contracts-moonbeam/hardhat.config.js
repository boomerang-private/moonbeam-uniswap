/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');

// Change private keys accordingly - ONLY FOR DEMOSTRATION PURPOSES - PLEASE STORE PRIVATE KEYS IN A SAFE PLACE
// Export your private key as
//       export PRIVKEY=0x.....
const privateKey = process.env.PRIVKEY;
const privateKeyDev = '0xa872f6cbd25a0e04a08b1e21098017a9e6194d101d75e13111f71410c59cd57f';

module.exports = {
  defaultNetwork: 'hardhat',

  networks: {
    hardhat: {},

    mandala: {
      url: 'https://eth-rpc-tc9.aca-staging.network',
      accounts: [privateKey],
      chainId: 595,
    },
    mainnet: {
      url: 'https://eth-rpc-acala.aca-api.network',
      accounts: [privateKey],
      chainId: 787,
    },
    dev: {
      url: 'http://127.0.0.1:8545',
      accounts: [privateKeyDev],
      chainId: 595,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.5.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.6.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  etherscan: {
    apiKey: {
      moonbaseAlpha: 'key_here', // Moonbeam Moonscan API Key
    },
  },
  paths: {
    sources: './contracts',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 20000,
  },
};
