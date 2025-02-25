const { ethers } = require('hardhat');

// Deploy function
async function deploy() {
   [account] = await ethers.getSigners();
   callerAddress = account.address;
   console.log(`call contracts using ${callerAddress}`);

   const router = '0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108';
   const token = '0xa2dae3ed07ea2d595b6dfa6370772e23d508068b';
   const lpToken = '0x1f033f266d40df38a053df1ea87b92b9310c9443';
   const pool = '0xd8fd0e0051482a947a7d55659d614a8354682923';

   const tokenFactory = await ethers.getContractFactory('@openzeppelin/contracts/token/ERC20/ERC20.sol:ERC20');
   const t = tokenFactory.attach(lpToken);
   const tx1 = await t.approve(
      router, // spender
      ethers.constants.MaxUint256, // value
   );
   console.log(`lp token approve result: `, tx1);

   const routerFactory = await ethers.getContractFactory('UniswapV2Router02');
   const r = routerFactory.attach(router);

   const currentTimestamp = Math.floor(Date.now() / 1000);
   const deadline = currentTimestamp + 20 * 60; // 20 mins
   const tx2 = await r.removeLiquidityETH(
      token, // token
      ethers.utils.parseEther("30"), // liquidity
      ethers.utils.parseEther("0"), // amountTokenMin
      ethers.utils.parseEther("0"), // amountETHMin
      callerAddress, // to
      deadline, // deadline
   );
   console.log(`router removeLiquidityETH result: `, tx2);
}

deploy()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
