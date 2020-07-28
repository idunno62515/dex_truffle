const TestToken = artifacts.require("TestToken");
const Reserve  = artifacts.require("Reserve");

module.exports = async function(deployer, network, accounts) {

  await deployer.deploy(TestToken, "TokenB", "TKB", 18);
  const tokenB =  await TestToken.deployed();

  await deployer.deploy(Reserve, tokenB.address);

}