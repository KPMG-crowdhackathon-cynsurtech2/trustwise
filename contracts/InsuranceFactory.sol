pragma solidity ^0.5.1;

import "./Insurance.sol";

contract InsuranceFactory {
    event ContractInstantiation(address indexed creator, address indexed instance);

    address[] contracts;

    function create(address _client, uint256 _expiryDate, uint256 _maxPayout, uint256[] memory _coveredCases) public payable returns (address) {
        address instance = address((new Insurance).value(msg.value)(msg.sender, _client, _expiryDate, _maxPayout, _coveredCases));
        emit ContractInstantiation(msg.sender, instance);
        contracts.push(instance);
        return instance;
    }

    function getContracts() public view returns (address[] memory) {
        return contracts;
    }
}
