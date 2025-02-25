const { ethers } = require('hardhat');

// Deploy function
async function deploy() {
   [account] = await ethers.getSigners();
   callerAddress = account.address;
   console.log(`call contracts using ${callerAddress}`);

   // dev
   //const router = '0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108';
   //const weth = '0x3d3593927228553b349767ABa68d4fb1514678CB';
   //const token = 'a2dae3ed07ea2d595b6dfa6370772e23d508068b';

   // mandala
   const router = '0x1f11F9df8e95dBc007f2A7Ec8E4D889810aA0A60';
   const weth = '0x83112596f4aE4c874a549B2C9EABBecbfA2eE097';
   const token = '0x6A4EbA793c6cc0D9167fbE03B944633B8098531B';

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
