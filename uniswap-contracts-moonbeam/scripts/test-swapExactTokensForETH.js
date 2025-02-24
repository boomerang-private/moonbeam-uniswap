const { ethers } = require('hardhat');

// Deploy function
async function deploy() {
   [account] = await ethers.getSigners();
   callerAddress = account.address;
   console.log(`call contracts using ${callerAddress}`);

   const router = '0x1f11F9df8e95dBc007f2A7Ec8E4D889810aA0A60';
   const weth = '0x83112596f4aE4c874a549B2C9EABBecbfA2eE097';
   const token = '0x1E375db53Ee4508d4CE8589877C7b6c8cf5d4a33';

   const tokenFactory = await ethers.getContractFactory('@openzeppelin/contracts/token/ERC20/ERC20.sol:ERC20');
   const t = tokenFactory.attach(token);
   const tx1 = await t.approve(
      router, // spender
      ethers.constants.MaxUint256, // value
   );
   console.log(`token approve result: `, tx1);

   const routerFactory = await ethers.getContractFactory('UniswapV2Router02');
   const r = routerFactory.attach(router);

   const currentTimestamp = Math.floor(Date.now() / 1000);
   const deadline = currentTimestamp + 20 * 60; // 20 mins
   const tx2 = await r.swapExactTokensForETH(
      ethers.utils.parseEther("2000"), // amountIn
      ethers.utils.parseEther("0.1"), // amountOutMin
      [token, weth], // path
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
