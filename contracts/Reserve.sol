pragma solidity 0.4.17;

import {TestToken} from "./TestToken.sol";

contract Reserve {
    struct Fund {
        uint ethStored;
        uint tokenStored;
    }
    
    Fund public funds;
    
    address public owner;
    uint public decimals;
    uint public constant inWei = 10 ** 18;
    address public supportToken;
    uint public buyRate = 10; 
    uint public sellRate = 10;
    address public constant ETH_ADDRESS = 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee;
    
    function Reserve(address _supportToken) public {
        owner = msg.sender;
        supportToken = _supportToken;
        TestToken tokenContract = TestToken(supportToken);
        decimals = tokenContract.decimals();
        funds.ethStored = 0;
        funds.tokenStored = 1000000 * (10 ** decimals);
    }

    function() public payable {
        funds.ethStored += msg.value;
    }
    
    function withdrawFunds(address _token, uint _amount, address _destAddress) public onlyOwner{
        if(_token == ETH_ADDRESS){
            
            require(funds.ethStored > 0 && _amount > 0 && _amount <= funds.ethStored);
            _destAddress.transfer(_amount);
            funds.ethStored -= _amount;
        }
        if(_token == supportToken){
            require(funds.tokenStored > 0 && _amount > 0  && _amount <= funds.tokenStored);
            TestToken tokenContract = TestToken(supportToken);
            tokenContract.transfer(_destAddress, _amount);
            funds.tokenStored -= _amount;
        }
    }
    
    function setExchangeRates(uint _buyRate, uint _sellRate) public onlyOwner {
        require(_buyRate >= 0 && _sellRate >= 0 );
        buyRate = _buyRate;
        sellRate = _sellRate;
    }
    
    function getExchangeRate(bool _isBuy, uint _srcAmount) public view returns(uint){
        if(_isBuy) {
            if(funds.tokenStored > 0){
                return (((_srcAmount * (10**decimals) * (10 ** decimals)) / inWei)  / buyRate) ;
            }
            return 0;
        }else {
            if(funds.ethStored > 0){
                return ((_srcAmount * (10**decimals) * inWei) )/ (sellRate * (10**decimals));
            }
            return 0;
        }
    }

    function toDecimal(uint _value) private view returns(uint) {
        return _value * (10 ** decimals);
    }
    
    function exchange(bool _isBuy, uint _srcAmount) public payable {
        TestToken tokenContract = TestToken(supportToken);
        uint transferAmount;
        if(_isBuy){
            require(funds.tokenStored > 0);
            require(_srcAmount == msg.value);
            transferAmount = getExchangeRate(true, msg.value);
            tokenContract.transfer(msg.sender, transferAmount);
            funds.tokenStored -= transferAmount;
            funds.ethStored += msg.value;
        } else {
            require(funds.ethStored > 0);
            tokenContract.transferFrom(msg.sender, address(this), _srcAmount);
            transferAmount = getExchangeRate(false, _srcAmount);
            msg.sender.transfer(transferAmount);
            funds.tokenStored += _srcAmount;
            funds.ethStored -= transferAmount;
        }
    }
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
}