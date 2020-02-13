const dapp  = artifacts.require('../contracts/dapp.sol');

contract('dapp',accounts => {
  before(async () => {
  let a = await dapp.deployed();
  await a.goFishing(2);
  let b = await a.getFisherFish();
  let c = await a.getFisherFishState();
  await a.releaseFish();
  await a.sellFish(20);
  let d = await a.getCommodity();
  await a.buyFish(0);

  console.log("测试合约地址:",a.address);
  console.log("getFisherFish返回值结构:",b);
  console.log("getFisherFishState返回值结构:",c);
  console.log("getCommodity返回值结构:",d);
  
  });
  it('Check whether the contract has been issued successfully', async () => {
    console.log("测试合约的操作:");
  }); 
});