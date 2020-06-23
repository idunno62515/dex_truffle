// const Migrations = artifacts.require("Migrations");

// module.exports = function(deployer) {
//   deployer.deploy(Migrations);
// };

const TestToken = artifacts.require("TestToken");
const Reserve  = artifacts.require("Reserve");
const Exchange  = artifacts.require("Exchange");


module.exports = async function(deployer, network, accounts) {
  // deployer.deploy(TestToken, "TokenA", "TKA", 18).then(function(){
  //   return deployer.deploy(Reserve, TestToken.address);
  // }).then(function(){
  //   return TestToken.deployed();
  // }).then(function(instance){
  //   return instance.transfer(Reserve.address, 1000);
  // }).then(console.log);


  // deployer.deploy(TestToken, "TokenB", "TKB", 18).then(function(){
  //   return deployer.deploy(Reserve, TestToken.address);
  // });

  await deployer.deploy(TestToken, "TokenA", "TKA", 18);
  const tokenA =  await TestToken.deployed();

  await deployer.deploy(Reserve, tokenA.address);
  const reserveA = await Reserve.deployed();
  const res = await tokenA.transfer(reserveA.address, '1000000');
  await reserveA.setExchangeRates(2, 3);

  await deployer.deploy(Exchange);
  const exchageCtr = await Exchange.deployed();
  await exchageCtr.addReserve(reserveA.address, tokenA.address, true);

  await exchageCtr.exchangeToken('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', tokenA.address, 10, 
  {from:accounts[1], value: web3.utils.toWei('10', 'ether')})

  await tokenA.approve(exchageCtr.address, 6, {from:accounts[1]})

};


/*

a = await TestToken.at(_a)
re = await Reserve.at(_re)
ex = await Exchange.at(_ex)



ex.exchangeToken(_a, '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 6, {from:accounts[1]})


*/
