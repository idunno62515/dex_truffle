pragma solidity 0.4.17;

import {TestToken} from "./TestToken.sol";

contract Reserve {
    struct Fund {
        uint ethStored;
        uint tokenStored;
    }
    
    Fund public funds;
    
    address public owner;
    address public supportToken;
    uint public buyRate = 10;
    uint public sellRate = 10;
    address public constant ETH_ADDRESS = 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee;
    
    function Reserve(address _supportToken) public {
        owner = msg.sender;
        supportToken = _supportToken;
        funds.ethStored = 0;
        funds.tokenStored = 1000000;
    }

    function() public payable {
        funds.ethStored += msg.value;
    }
    
    function withdrawFunds(address _token, uint _amount, address _destAddress) public onlyOwner{
        if(_token == ETH_ADDRESS){
            uint amountInWei = _amount * 10**18;
            require(funds.ethStored > 0 && amountInWei > 0 && amountInWei <= funds.ethStored);
            _destAddress.transfer(_amount * amountInWei);
            funds.ethStored -= amountInWei;
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
                return buyRate * _srcAmount;
            }
            return 0;
        }else {
            if(funds.ethStored > 0){
                return _srcAmount / sellRate;
            }
            return 0;
        }
    }
    
    function exchange(bool _isBuy, uint _srcAmount) public payable {
        TestToken tokenContract = TestToken(supportToken);
        if(_isBuy){
            require(funds.tokenStored > 0);
            require(_srcAmount * 10**18 == msg.value);
            tokenContract.transfer(msg.sender, _srcAmount * buyRate );
            funds.tokenStored -= (_srcAmount * buyRate);
            funds.ethStored += msg.value;
        } else {
            require(funds.ethStored > 0);
            tokenContract.transferFrom(msg.sender, address(this), _srcAmount);
            msg.sender.transfer((_srcAmount * 10**18)/sellRate);
            funds.tokenStored += _srcAmount;
            funds.ethStored -= ((_srcAmount * 10**18)/sellRate);
        }
    }
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
}