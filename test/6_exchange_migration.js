const TestToken = artifacts.require("TestToken");
const Reserve  = artifacts.require("Reserve");
const Exchange  = artifacts.require("Exchange");


module.exports = async function(deployer, network, accounts) {

  let transferAmount = 1000000 * 10 ** 18;

  await deployer.deploy(TestToken, "TokenA", "TKA", 18);
  const tokenA =  await TestToken.deployed();

  await deployer.deploy(TestToken, "TokenB", "TKB", 18);
  const tokenB =  await TestToken.deployed();

  await deployer.deploy(Reserve, tokenA.address);
  const reserveA = await Reserve.deployed();
  await tokenA.transfer(reserveA.address, String(10n ** 24n));
  await reserveA.setExchangeRates(String(5 * 10 ** 17), String(2 * 10 ** 18));

  await deployer.deploy(Reserve, tokenB.address);
  const reserveB = await Reserve.deployed();
  await tokenB.transfer(reserveB.address, String(10n ** 24n));
  await reserveB.setExchangeRates(String(4 * 10 ** 18), String(25 * 10 ** 16));

  await deployer.deploy(Exchange);
  const exchageCtr = await Exchange.deployed();
  await exchageCtr.addReserve(reserveA.address, tokenA.address, true);
  await exchageCtr.addReserve(reserveB.address, tokenB.address, true);

  console.log(`tokenA: ${tokenA.address}`);
  console.log(`tokenB: ${tokenB.address}`);
  console.log(`reserveA: ${reserveA.address}`);
  console.log(`reserveB: ${reserveB.address}`);
  console.log(`exchange: ${exchageCtr.address}`);

  // await web3.eth.sendTransaction({from:accounts[0], to: reserveA.address, value: web3.utils.toWei('10', 'ether')});
  // await web3.eth.sendTransaction({from:accounts[0], to: reserveB.address, value: web3.utils.toWei('10', 'ether')});
  
  // await exchageCtr.exchangeToken('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', tokenA.address, 12 * 10 ** 18 + '', 
  // {from:accounts[1], value: web3.utils.toWei('12', 'ether')})

  // await tokenA.approve(exchageCtr.address, 24 * 10 ** 18 + '', {from:accounts[1]})

};


/*
_e = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
_a = '0x6Ac72CD74b460E9444A16CB117A2dA95222166A2'
_b = '0x511dFA130fd9DB521DA6Fa38e1cF47A6d476DC7F'
_ra = '0xe26205C7A48a7626117Ad3A13DB2Ef323aF45bec'
_rb = '0x1f209187E10269bbC340C3631867cf597676e054'
_ex = '0xE1548fC78352ED595968E827453a2a283184F59a'

a = await TestToken.at(_a)
b = await TestToken.at(_b)
ra = await Reserve.at(_ra)
rb = await Reserve.at(_rb)
ex = await Exchange.at(_ex)



ex.exchangeToken(_a, '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 1, {from:accounts[1]})


eth 12 -> 24 A -> 8 eth -> 24 B -> 6 eth

*/


/*

2_exchange_migration.js
=======================

   Replacing 'TestToken'
   ---------------------
   > transaction hash:    0x1f1bd7a37c0e1e63110579e3144c111ff2a277ba44867eace213a44f3fefd49f
   > Blocks: 0            Seconds: 0
   > contract address:    0x6Ac72CD74b460E9444A16CB117A2dA95222166A2
   > block number:        3
   > block timestamp:     1592917252
   > account:             0x72bC22B36325f8927Fb0f1c76879119C0DAdb93D
   > balance:             99.97618472
   > gas used:            981462 (0xef9d6)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.01962924 ETH


   Replacing 'TestToken'
   ---------------------
   > transaction hash:    0x3bc90612e09ce40f67a4c9fc6af0b26bba1b58dee7cba127143a452c73468cf4
   > Blocks: 0            Seconds: 0
   > contract address:    0x511dFA130fd9DB521DA6Fa38e1cF47A6d476DC7F
   > block number:        4
   > block timestamp:     1592917254
   > account:             0x72bC22B36325f8927Fb0f1c76879119C0DAdb93D
   > balance:             99.95655548
   > gas used:            981462 (0xef9d6)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.01962924 ETH


   Replacing 'Reserve'
   -------------------
   > transaction hash:    0xf7dd49ac97a925463b1bcba4a3f301ca40c24a2bff3ef1bceffdad3e7d3955a0
   > Blocks: 0            Seconds: 0
   > contract address:    0xe26205C7A48a7626117Ad3A13DB2Ef323aF45bec
   > block number:        5
   > block timestamp:     1592917255
   > account:             0x72bC22B36325f8927Fb0f1c76879119C0DAdb93D
   > balance:             99.9461556
   > gas used:            519994 (0x7ef3a)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.01039988 ETH


   Replacing 'Reserve'
   -------------------
   > transaction hash:    0xa3e2765150b622bfcea2257972de8db7978396dd5be25a8c0b81bee4fd3a0134
   > Blocks: 0            Seconds: 0
   > contract address:    0x1f209187E10269bbC340C3631867cf597676e054
   > block number:        8
   > block timestamp:     1592917256
   > account:             0x72bC22B36325f8927Fb0f1c76879119C0DAdb93D
   > balance:             99.93409644
   > gas used:            519994 (0x7ef3a)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.01039988 ETH


   Replacing 'Exchange'
   --------------------
   > transaction hash:    0x0f4ef4bdf754d5743001cf0e6f8c3bf5246fb60dfc730b03226927edf3248dc7
   > Blocks: 0            Seconds: 0
   > contract address:    0xE1548fC78352ED595968E827453a2a283184F59a
   > block number:        11
   > block timestamp:     1592917257
   > account:             0x72bC22B36325f8927Fb0f1c76879119C0DAdb93D
   > balance:             99.90880068
   > gas used:            1181824 (0x120880)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.02363648 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.08369472 ETH

*/