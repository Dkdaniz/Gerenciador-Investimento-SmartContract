pragma solidity ^0.4.21;


contract ERC20Basic {
    uint256 public totalSupply;
    function balanceOf(address who) public view returns (uint256);
    function transfer(address to, uint256 value) public returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
}


/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
    address public owner;


    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
    constructor() public {
        owner = msg.sender;
    }

  /**
   * @dev Throws if called by any account other than the owner.
   */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0));
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

}
/**
 * @title Pausable
 * @dev Base contract which allows children to implement an emergency stop mechanism.
 */
contract Pausable is Ownable {
    event Pause();
    event Unpause();

    bool public paused = false;


    /**
    * @dev Modifier to make a function callable only when the contract is not paused.
    */
    modifier whenNotPaused() {
        require(!paused);
        _;
    }

    /**
    * @dev Modifier to make a function callable only when the contract is paused.
    */
    modifier whenPaused() {
        require(paused);
        _;
    }

    /**
    * @dev called by the owner to pause, triggers stopped state
    */
    function pause() onlyOwner whenNotPaused public {
        paused = true;
        emit Pause();
    }

    /**
    * @dev called by the owner to unpause, returns to normal state
    */
    function unpause() onlyOwner whenPaused public {
        paused = false;
        emit Unpause();
    }
}

/**
 * @title ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/20
 */
contract ERC20 is ERC20Basic {
    function allowance(address owner, address spender) public view returns (uint256);
    function transferFrom(address from, address to, uint256 value) public returns (bool);
    function approve(address spender, uint256 value) public returns (bool);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

library SafeMath {
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a * b;
        assert(a == 0 || c / a == b);
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}

/**
 * @title Basic token
 * @dev Basic version of StandardToken, with no allowances.
 */
contract BasicToken is ERC20Basic {
    using SafeMath for uint256;

    mapping(address => uint256) balances;

    /**
    * @dev transfer token for a specified address
    * @param _to The address to transfer to.
    * @param _value The amount to be transferred.
    */
    function transfer(address _to, uint256 _value) public returns (bool) {
        require(_to != address(0x0));

        // SafeMath.sub will throw if there is not enough balance.
        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    /**
    * @dev Gets the balance of the specified address.
    * @param _owner The address to query the the balance of.
    * @return An uint256 representing the amount owned by the passed address.
    */
    function balanceOf(address _owner) public constant returns (uint256 balance) {
        return balances[_owner];
    }

}


/**
 * @title Standard ERC20 token
 *
 * @dev Implementation of the basic standard token.
 * @dev https://github.com/ethereum/EIPs/issues/20
 * @dev Based on code by FirstBlood: https://github.com/Firstbloodio/token/blob/master/smart_contract/FirstBloodToken.sol
 */
contract StandardToken is ERC20, BasicToken, Pausable {

    mapping (address => mapping (address => uint256)) allowed;


    /**
    * @dev Transfer tokens from one address to another
    * @param _from address The address which you want to send tokens from
    * @param _to address The address which you want to transfer to
    * @param _value uint256 the amount of tokens to be transferred
    */
    function transferFrom(address _from, address _to, uint256 _value) public whenNotPaused returns (bool) {
        require(_to != address(0x0));

        uint256 _allowance = allowed[_from][msg.sender];

        // Check is not needed because sub(_allowance, _value) will already throw if this condition is not met
        // require (_value <= _allowance);

        balances[_from] = balances[_from].sub(_value);
        balances[_to] = balances[_to].add(_value);
        allowed[_from][msg.sender] = _allowance.sub(_value);
        emit Transfer(_from, _to, _value);
        return true;
    }

    
    function approve(address _spender, uint256 _value) public whenNotPaused returns (bool) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public constant whenNotPaused returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }

    
    function increaseApproval (address _spender, uint _addedValue) public whenNotPaused returns (bool success) {
        allowed[msg.sender][_spender] = allowed[msg.sender][_spender].add(_addedValue);
        emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
        return true;
    }

    function decreaseApproval (address _spender, uint _subtractedValue) public whenNotPaused returns (bool success) {
        uint oldValue = allowed[msg.sender][_spender];
        if (_subtractedValue > oldValue) {
            allowed[msg.sender][_spender] = 0;
        } else {
            allowed[msg.sender][_spender] = oldValue.sub(_subtractedValue);
        }
        emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
        return true;
    }

}

contract ExeCli{
    using SafeMath for uint256;

    address public exemplecoinAddress;
    address public erc20Address = 0xc39f4FD602Eb44d56C67226d3541C440d1cBF2f3;
    address public owner = 0x5D8262d1c6FDBc6f49297C98C090c884DaA6fdDd;
    string public investPercent;
    string public daysGracePeriod;
    uint256 public investValue;
    string public hashPDFContract;
    bool public contractActive = true;
   
    ERC20 exemplecoinContract;
    ERC20 erc20coinContract;
    
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier _erc20PriceNonZero(uint256 _erc20Price){
        require(_erc20Price > 0, "");
        _;
    }

    modifier _valueNonZero(uint256 _value){
        require(_value > 0, "");
        require(investValue > _value, "");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    modifier _contractActive(){
        require(contractActive, "");
        _;
    }

    constructor(
        address _exemplecoinAddress, 
        string _investPercent, 
        uint256 _investValue,
        string _daysGracePeriod, 
        string _hashPDFContract
        ) 
        public {
        investPercent = _investPercent;
        investValue = _investValue;
        hashPDFContract = _hashPDFContract;
        daysGracePeriod = _daysGracePeriod;
        exemplecoinAddress = _exemplecoinAddress;
        exemplecoinContract = ERC20(exemplecoinAddress);
        erc20coinContract = ERC20(erc20Address);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0),"");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
    
    function _setHashPdf(string _hash)  external onlyOwner _contractActive{
        hashPDFContract = _hash;
    }

    function _pay(uint256 _value, uint256 _erc20Price, address _exchangeCli) 
    external 
    onlyOwner 
    _valueNonZero(_value) 
    _contractActive
    returns(bool){
        require(exemplecoinContract.balanceOf(this) > _value);
        uint256 totalerc20 = _value.div(_erc20Price).mul(10 ** 18);
        require(erc20coinContract.transferFrom(exemplecoinAddress, _exchangeCli, totalerc20),"");
        require(exemplecoinContract.transfer(exemplecoinAddress,_value),"");
        investValue.sub(_value);
    }

    function creditPayment(uint256 _value) external onlyOwner _contractActive returns(bool){
        require(exemplecoinContract.transferFrom(exemplecoinAddress, this, _value),"");
        investValue.add(_value);
    }

    function _endContract(uint256 _erc20Price, address _exchangeCli) 
    onlyOwner  
    _erc20PriceNonZero(_erc20Price)
    _contractActive
    external 
    returns(bool){
        uint256 totalerc20 = investValue.div(_erc20Price).mul(10 ** 18);
        require(erc20coinContract.transferFrom(exemplecoinAddress, _exchangeCli, totalerc20),"");
        require(exemplecoinContract.transfer(exemplecoinAddress,investValue),"");
        contractActive = false;
    }
    
    function() payable public{}
}

contract Exemplecoin is StandardToken {
    using SafeMath for uint256;

    address[] public newContracts;
   
    string public name = "exemplecoin";
    string public symbol = "EXE";
    uint256 public decimals = 18;
    uint256 public totalSupply = 500000000 * (10 ** decimals); //500 000 000 exemplecoin

    ERC20 erc20Contract;

    constructor() public {         
        balances[this] = totalSupply;
        erc20Contract = ERC20(0xc39f4FD602Eb44d56C67226d3541C440d1cBF2f3);
    }

    function createExeCli (
        string _investPercent, 
        uint256 _investValue, 
        string _daysGracePeriod, 
        string _hashPDFContract) 
        onlyOwner 
        external
        returns (address){
        address newContract = new ExeCli(this,_investPercent, _investValue, _daysGracePeriod, _hashPDFContract);
        newContracts.push(newContract);
        
        sendTokenExeContract(newContract,_investValue);
        
        uint256 valueExe = 100000000 * (10 ** decimals);
        uint256 valueerc20 = valueExe / 3;
        
        erc20Contract.approve(newContract,valueerc20);
        allowed[this][newContract] = valueExe;
        emit Approval(this, newContract, valueExe);

        return newContract;
    } 

    function sendTokenExeContract(address _to, uint256 _value) public onlyOwner returns (bool){
        require(_to != address(0x0),"");
        balances[this] = balances[this].sub(_value);
        balances[_to] = balances[_to].add(_value);
        emit Transfer(this, _to, _value);
        return true;
    }
    
    function withdrawerc20(address _to, uint256 _value)public onlyOwner returns (bool){
        require(_to != address(0x0),"");
        erc20Contract.transfer(_to,_value);
        return true;
    }
    
    function getNumberContracts() public view returns (uint256){
        return newContracts.length;
    }
    
    function() payable public{}
   
}