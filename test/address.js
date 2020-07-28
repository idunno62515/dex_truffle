/**
 * 
 * 
 * 
 * 
 * 2_token_a.js
============

   Deploying 'TestToken'
   ---------------------
   > transaction hash:    0xa3b8b953603c4807d68d053f757e29b6cac9c218f2db8f19a4bace3f15148f72
   > Blocks: 0            Seconds: 5
   > contract address:    0x1b107a69081621e5f216e7BC217A2F942dBA54E2
   > block number:        6917222
   > block timestamp:     1595913923
   > account:             0x440C03912f83F42FA90A443c4dB3A6B8e1e6FBb8
   > balance:             100.810715233
   > gas used:            981462 (0xef9d6)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.01962924 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 6917223)
   > confirmation number: 2 (block: 6917224)

   Deploying 'Reserve'
   -------------------
   > transaction hash:    0xfcdecc26117fb3b39952f497804bf7cfec083cabf0ae158a2d244679afbc1751
   > Blocks: 1            Seconds: 21
   > contract address:    0x5b9C6Fd4c736a0cFA918b91C2ED4aEfe55D4b1E6
   > block number:        6917226
   > block timestamp:     1595913983
   > account:             0x440C03912f83F42FA90A443c4dB3A6B8e1e6FBb8
   > balance:             100.774665673
   > gas used:            821016 (0xc8718)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.01642032 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 6917227)
   > confirmation number: 2 (block: 6917228)

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.03604956 ETH

_e = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
_a = '0x1b107a69081621e5f216e7BC217A2F942dBA54E2'
_ra = '0x5b9C6Fd4c736a0cFA918b91C2ED4aEfe55D4b1E6'
_b = '0xacAa13E2C52a2F14459E587B72e58d073e089253'
_rb = '0xF9a3fD4ccc1D0DD360A31489282A7293121d5ffA'
_ex = '0xa543c859801b09c91e78D74886F32C5dC282007C'
a = await TestToken.at(_a)
b = await TestToken.at(_b)
ra = await Reserve.at(_ra)
rb = await Reserve.at(_rb)
ex = await Exchange.at(_ex)

 */