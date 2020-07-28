const TestToken = artifacts.require("TestToken");
const Reserve  = artifacts.require("Reserve");
const Exchange  = artifacts.require("Exchange");


module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(Exchange);
}