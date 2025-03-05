const { ethers } = require('hardhat');
const { ADDRESSES } = require("./addresses");

// Deploy function
async function deploy() {
   [account] = await ethers.getSigners();
   callerAddress = account.address;
   console.log(`call contracts using ${callerAddress}`);

   const network = hre.network.name;
   const addresses = ADDRESSES[network];

   const tokenFactory = await ethers.getContractFactory('@openzeppelin/contracts/token/ERC20/ERC20.sol:ERC20');
   const t = tokenFactory.attach(addresses.token);
   const tx1 = await t.approve(
      addresses.router, // spender
      ethers.constants.MaxUint256, // value
   );
   console.log(`token approve result: `, tx1);
}

deploy()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
