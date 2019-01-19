pragma solidity ^0.5.1;

import "./Bill.sol";

contract BillFactory {
    event ContractInstantiation(address indexed creator, address indexed instance);

    address[] contracts;

    function create(uint256 _amountToPay, uint256 _reasonCaseId, uint256 _logId, address _patient) public payable returns (address) {
        address instance = address((new Bill).value(msg.value)(_amountToPay, _reasonCaseId, _logId, _patient, msg.sender));
        emit ContractInstantiation(msg.sender, instance);
        contracts.push(instance);
        return instance;
    }

    function getContracts() public view returns (address[] memory) {
        return contracts;
    }
}