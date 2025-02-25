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

   const routerFactory = await ethers.getContractFactory('UniswapV2Router02');
   const r = routerFactory.attach(addresses.router);

   const currentTimestamp = Math.floor(Date.now() / 1000);
   const deadline = currentTimestamp + 20 * 60; // 20 mins
   const tx2 = await r.swapExactTokensForETH(
      ethers.utils.parseEther("2000"), // amountIn
      ethers.utils.parseEther("0.1"), // amountOutMin
      [addresses.token, addresses.waca], // path
      callerAddress, // to
      deadline, // deadline
   );
   console.log(`router swapExactTokensForETH result: `, tx2);
}

deploy()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
