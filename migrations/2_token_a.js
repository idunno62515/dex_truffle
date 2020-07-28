const TestToken = artifacts.require("TestToken");
const Reserve  = artifacts.require("Reserve");

module.exports = async function(deployer, network, accounts) {

  await deployer.deploy(TestToken, "TokenA", "TKA", 18);
  const tokenA =  await TestToken.deployed();

  await deployer.deploy(Reserve, tokenA.address);

}