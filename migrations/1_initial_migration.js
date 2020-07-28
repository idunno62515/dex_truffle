const Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};


/*

_e = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
_a = '0xbA0AFb97059A05A8Ca448F4870e7c231b1c46655'
_b = '0xA69FA88C0bC94d3b9DC40162D53b34C8F3543360'
_ra = '0x0848AdBa5B175fd3f54A0885C3D8E2C659EFdfb9'
_rb = '0x963e5F81330876905F88FB6dD32B7F062652D6Fa'
_ex = '0x004BF9B51578e6e967cBB158D63Af7D418100f60'
a = await TestToken.at(_a)
b = await TestToken.at(_b)
ra = await Reserve.at(_ra)
rb = await Reserve.at(_rb)
ex = await Exchange.at(_ex)



ex.exchangeToken(_a, '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 1, {from:accounts[1]})


eth 12 -> 24 A -> 8 eth -> 24 B -> 6 eth







Replacing 'TestToken'
   ---------------------
   > transaction hash:    0xe78b71b472bda4d16672a45a48f4cc25f94994def898e68f84ddcc896f4d4b27
   > Blocks: 0            Seconds: 0
   > contract address:    0xbA0AFb97059A05A8Ca448F4870e7c231b1c46655
   > block number:        3
   > block timestamp:     1594119175
   > account:             0x067615649b6e8A937334F02A882b32d013F9fF99
   > balance:             99.97618472
   > gas used:            981462 (0xef9d6)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.01962924 ETH


   Replacing 'TestToken'
   ---------------------
   > transaction hash:    0x35d98ef26b59311d34a8c7e2df0bb30812325f136ed8679d8f54305625b1a7f5
   > Blocks: 0            Seconds: 0
   > contract address:    0xA69FA88C0bC94d3b9DC40162D53b34C8F3543360
   > block number:        4
   > block timestamp:     1594119177
   > account:             0x067615649b6e8A937334F02A882b32d013F9fF99
   > balance:             99.95655548
   > gas used:            981462 (0xef9d6)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.01962924 ETH


   Replacing 'Reserve'
   -------------------
   > transaction hash:    0x7c883861f6de7f2740d909ea16a826b4d4e8976512edfdace15a55bad87bce96
   > Blocks: 0            Seconds: 0
   > contract address:    0x0848AdBa5B175fd3f54A0885C3D8E2C659EFdfb9
   > block number:        5
   > block timestamp:     1594119178
   > account:             0x067615649b6e8A937334F02A882b32d013F9fF99
   > balance:             99.94071546
   > gas used:            792001 (0xc15c1)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.01584002 ETH


   Replacing 'Reserve'
   -------------------
   > transaction hash:    0x42921d44502957e779d4478eeb172720e2853673f3016f93274416e225b0ef8e
   > Blocks: 0            Seconds: 0
   > contract address:    0x963e5F81330876905F88FB6dD32B7F062652D6Fa
   > block number:        8
   > block timestamp:     1594119179
   > account:             0x067615649b6e8A937334F02A882b32d013F9fF99
   > balance:             99.9231944
   > gas used:            792001 (0xc15c1)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.01584002 ETH


   Replacing 'Exchange'
   --------------------
   > transaction hash:    0x055e20730a74da885fbfa98c97b76fb4aa37eed259d93e6b23b73bd6e9bbc3ef
   > Blocks: 0            Seconds: 0
   > contract address:    0x004BF9B51578e6e967cBB158D63Af7D418100f60
   > block number:        11
   > block timestamp:     1594119181
   > account:             0x067615649b6e8A937334F02A882b32d013F9fF99
   > balance:             99.89537546
   > gas used:            1306895 (0x13f10f)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0261379 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.09707642 ETH



*/