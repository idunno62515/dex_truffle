const Exchange = artifacts.require('Exchange');
const Reserve = artifacts.require('Reserve');
const TestToken = artifacts.require('TestToken');

let exchange;
let reserveA;
let reserveB;
let tokenA;
let tokenB;

const BUY_RATE_A = BigInt(5 * 10 ** 17);
const SELL_RATE_A = BigInt(2 * 10 ** 18);
const DECIMAL = 10 ** 18;
const ETH_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

contract('Reserve ----------------------------------------', accounts => {
  beforeEach(async () => {
    tokenA = await TestToken.new('TokenA', 'TKA', 18);
    reserveA = await Reserve.new(tokenA.address);
  });

  describe('Constructor', async () => {
    it('Support Token address shoud equal token address', async () => {
      result = await reserveA.supportToken.call();
      assert(result == tokenA.address);
    })
    it('Owner should be firt account', async () => {
      result = await reserveA.owner.call();
      assert(result == accounts[0]);
    })
  })

  describe('setExchangeRates, getExchangeRate', async () => {
    it('Check sell rate and buy rate', async () => {
      await tokenA.transfer(reserveA.address, String(10n ** 24n));
      await web3.eth.sendTransaction({
        from: accounts[0],
        to: reserveA.address,
        value: web3.utils.toWei('5', 'ether')
      });
      await reserveA.setExchangeRates(String(BUY_RATE_A), String(SELL_RATE_A));
      const buyRate = await reserveA.getExchangeRate(true, String(10 ** 18));
      const sellRate = await reserveA.getExchangeRate(false, String(10 ** 18));
      assert(BigInt(2 * 10 ** 18) == BigInt(buyRate));
      assert(BigInt(0.5 * 10 ** 18) == BigInt(sellRate));
    })

  });

  describe('exchange', async () => {
    it('Test buy token', async () => {
      await tokenA.transfer(reserveA.address, String(10n ** 24n));
      await web3.eth.sendTransaction({
        from: accounts[0],
        to: reserveA.address,
        value: web3.utils.toWei('5', 'ether')
      });
      await reserveA.setExchangeRates(String(BUY_RATE_A), String(SELL_RATE_A));
      const buyRate = await reserveA.getExchangeRate(true, String(10 ** 18));
      await reserveA.exchange(true, String(10 ** 18), {
        from: accounts[1],
        value: web3.utils.toWei('1', 'ether')
      });

      balanceTokenA = await tokenA.balanceOf(accounts[1]);
      assert(BigInt(balanceTokenA) == BigInt(buyRate));

    });

    it('Test sell token', async () => {
      await tokenA.transfer(reserveA.address, String(10n ** 24n));
      await web3.eth.sendTransaction({
        from: accounts[0],
        to: reserveA.address,
        value: web3.utils.toWei('5', 'ether')
      });
      await reserveA.setExchangeRates(String(BUY_RATE_A), String(SELL_RATE_A));
      const sellrate = await reserveA.getExchangeRate(true, String(10 ** 18));
      await reserveA.exchange(true, String(10 ** 18), {
        from: accounts[2],
        value: web3.utils.toWei('1', 'ether')
      });

      await tokenA.approve(reserveA.address, String(2 * 10 ** 18), {
        from: accounts[2],
      });

      await reserveA.exchange(false, String(10 ** 18), {
        from: accounts[2],
      });
      balanceTokenA = await tokenA.balanceOf(accounts[2]);
      assert(BigInt(balanceTokenA) == BigInt(10 ** 18));
    });
  })

  describe('setTradable', async () => {
    it('can not exchange when trade = false', async () => {
      try {
        await reserveA.setTradable(false);
        await tokenA.transfer(reserveA.address, String(10n ** 24n))
        await web3.eth.sendTransaction({
          from: accounts[0],
          to: reserveA.address,
          value: web3.utils.toWei('5', 'ether')
        });
        await reserveA.setExchangeRates(String(BUY_RATE_A), String(SELL_RATE_A));
        const buyRate = await reserveA.getExchangeRate(true, String(10 ** 18));
        await reserveA.exchange(true, String(10 ** 18), {
          from: accounts[1],
          value: web3.utils.toWei('1', 'ether')
        });
        assert(false);
      } catch (ex) {
        assert(true);
      }

    })
  })

  describe('withdrawFunds', async () => {
    it('test withdrawFunds function', async () => {
      const expectEth = 5;
      const expectToken = 1000000;
      const destAccount = accounts[5];
      await tokenA.transfer(reserveA.address, String(BigInt(expectToken) * BigInt(DECIMAL)));
      await web3.eth.sendTransaction({
        from: accounts[0],
        to: reserveA.address,
        value: web3.utils.toWei(String(expectEth), 'ether')
      });

      let funds = await reserveA.funds.call();
      assert((funds.ethStored / DECIMAL) == expectEth)
      assert((funds.tokenStored / DECIMAL) == expectToken)

      await reserveA.withdrawFunds(tokenA.address, String(BigInt(expectToken) * BigInt(DECIMAL)), destAccount, {
        from: accounts[0]
      });
      await reserveA.withdrawFunds(ETH_ADDRESS, String(expectEth * DECIMAL), destAccount, {
        from: accounts[0]
      });

      funds = await reserveA.funds.call();
      assert((funds.ethStored / DECIMAL) == 0)
      assert((funds.tokenStored / DECIMAL) == 0)

    })

  })



});

contract('Exchange ----------------------------------------', (accounts) => {

  // beforeEach(async () => {
  //   tokenA = await TestToken.new('TokenA', 'TKA', 18);
  //   reserveA = await Reserve.new(tokenA.address);
  //   tokenB = await TestToken.new('TokenB', 'TKB', 18);
  //   reserveB = await Reserve.new(tokenB.address);
  //   exchange = await Exchange.new();
  //   // await tokenA.transfer(reserveA.address, String(10n ** 24n));
  // });


  describe('addReserve', async () => {
    before(async () => {
      tokenA = await TestToken.new('TokenA', 'TKA', 18);
      reserveA = await Reserve.new(tokenA.address);
      tokenB = await TestToken.new('TokenB', 'TKB', 18);
      reserveB = await Reserve.new(tokenB.address);
      exchange = await Exchange.new();
    });

    it('add reserve', async () => {
      await exchange.addReserve(reserveA.address, tokenA.address, true);
      let result = await exchange.listReserve.call(tokenA.address);
      assert(result == reserveA.address);
    });

    it('remove reserve', async () => {
      await exchange.addReserve(reserveA.address, tokenA.address, false);
      let result = await exchange.listReserve.call(tokenA.address);
      assert(result == 0x0);
    });

  });

  describe('getExchangeRate', async () => {
    before(async () => {
      tokenA = await TestToken.new('TokenA', 'TKA', 18);
      reserveA = await Reserve.new(tokenA.address);

      await tokenA.transfer(reserveA.address, String(10n ** 24n));
      await reserveA.setExchangeRates(String(5 * 10 ** 17), String(2 * 10 ** 18));

      tokenB = await TestToken.new('TokenB', 'TKB', 18);
      reserveB = await Reserve.new(tokenB.address);

      await tokenB.transfer(reserveB.address, String(10n ** 24n));
      await reserveB.setExchangeRates(String(4 * 10 ** 18), String(25 * 10 ** 16));

      exchange = await Exchange.new();

      await exchange.addReserve(reserveA.address, tokenA.address, true);
      await exchange.addReserve(reserveB.address, tokenB.address, true);

      await web3.eth.sendTransaction({
        from: accounts[0],
        to: reserveA.address,
        value: web3.utils.toWei('5', 'ether')
      });

      await web3.eth.sendTransaction({
        from: accounts[0],
        to: reserveB.address,
        value: web3.utils.toWei('5', 'ether')
      });
    });

    it('buy token', async () => {
      let reserveRate = await reserveA.getExchangeRate(true, String(1 * DECIMAL));
      let result = await exchange.getExchangeRate(ETH_ADDRESS, tokenA.address, String(1 * DECIMAL))
      assert(result / DECIMAL == reserveRate / DECIMAL);
    });

    it('sell token', async () => {
      let reserveRate = await reserveA.getExchangeRate(false, String(2 * DECIMAL));
      let result = await exchange.getExchangeRate(tokenA.address, ETH_ADDRESS, String(2 * DECIMAL))
      assert(result / DECIMAL == reserveRate / DECIMAL);
    });

    it('swap TKA to TKB', async () => {
      let ethReceivedBySellTKA = await reserveA.getExchangeRate(false, String(1 * DECIMAL));
      let tkbReceived = await reserveB.getExchangeRate(true, String(ethReceivedBySellTKA));
      let result = await exchange.getExchangeRate(tokenA.address, tokenB.address, String(1 * DECIMAL))
      assert(result / DECIMAL == tkbReceived / DECIMAL);
    });

  });


  describe('exchange', async () => {

    let testAccount = accounts[8];

    before(async () => {
      tokenA = await TestToken.new('TokenA', 'TKA', 18);
      reserveA = await Reserve.new(tokenA.address);

      await tokenA.transfer(reserveA.address, String(10n ** 24n));
      await reserveA.setExchangeRates(String(5 * 10 ** 17), String(2 * 10 ** 18));

      tokenB = await TestToken.new('TokenB', 'TKB', 18);
      reserveB = await Reserve.new(tokenB.address);

      await tokenB.transfer(reserveB.address, String(10n ** 24n));
      await reserveB.setExchangeRates(String(4 * 10 ** 18), String(25 * 10 ** 16));

      exchange = await Exchange.new();

      await exchange.addReserve(reserveA.address, tokenA.address, true);
      await exchange.addReserve(reserveB.address, tokenB.address, true);

      await web3.eth.sendTransaction({
        from: accounts[0],
        to: reserveA.address,
        value: web3.utils.toWei('5', 'ether')
      });

      await web3.eth.sendTransaction({
        from: accounts[0],
        to: reserveB.address,
        value: web3.utils.toWei('5', 'ether')
      });
    });

    it('buy token', async () => {
      let tkaReceived = await reserveA.getExchangeRate(true, String(1 * DECIMAL));
      await exchange.exchangeToken(ETH_ADDRESS, tokenA.address, String(1 * DECIMAL), {
        from: testAccount,
        value: String(1 * DECIMAL)
      });

      let balanceTKA = await tokenA.balanceOf(testAccount);
      assert(balanceTKA / DECIMAL == tkaReceived / DECIMAL);
    });

    it('sell token', async () => {


      await tokenA.approve(exchange.address, String(1 * DECIMAL), {
        from: testAccount
      });

      let tokenBefore = await tokenA.balanceOf(testAccount);
      await exchange.exchangeToken(tokenA.address, ETH_ADDRESS, String(1 * DECIMAL), {
        from: testAccount
      })
      let tokenAfter = await tokenA.balanceOf(testAccount);
      assert((tokenBefore - tokenAfter) / DECIMAL == 1)

    });

    it('swap TKA to TKB', async () => {

      let ethReceivedBySellTKA = await reserveA.getExchangeRate(false, String(1 * DECIMAL));
      let tkbExpect = await reserveB.getExchangeRate(true, String(ethReceivedBySellTKA))

      await tokenA.approve(exchange.address, String(1 * DECIMAL), {
        from: testAccount
      });

      let tokenBefore = await tokenB.balanceOf(testAccount);

      await exchange.exchangeToken(tokenA.address, tokenB.address, String(1 * DECIMAL), {
        from: testAccount
      })

      let tokenAfter = await tokenB.balanceOf(testAccount);

      assert((tokenAfter - tokenBefore) / DECIMAL == tkbExpect / DECIMAL)
    });

  });
});