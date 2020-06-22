pragma solidity 0.4.17;

// import {} "./TestToken.sol";
import {SafeMath, TestToken} from "./TestToken.sol";

contract Reserve {
    // using SafeMath for uint;
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
    }
    
    function withdrawFunds(address token, uint amount, address destAddress) public onlyOwner{
        
    }
    
    function setExchangeRates(uint _buyRate, uint _sellRate) public onlyOwner{
        require(_buyRate >= 0 && _sellRate >= 0 );
        buyRate = _buyRate;
        sellRate = _sellRate;
    }
    
    function getExchangeRate(bool _isBuy, uint _srcAmount) public view returns(uint){
        return _isBuy ? buyRate * _srcAmount : _srcAmount / sellRate;
    }
    
    function exchange(bool _isBuy, uint _srcAmount) public payable {
        TestToken tokenContract = TestToken(supportToken);
        if(_isBuy){
            require(_srcAmount * 10**18 == msg.value);
            tokenContract.transfer(msg.sender, _srcAmount * buyRate );
  
        }else {
            tokenContract = TestToken(supportToken);
            tokenContract.transferFrom(msg.sender, this, _srcAmount);
            (msg.sender).transfer((_srcAmount * 10**18/sellRate));
        }
    }
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
}