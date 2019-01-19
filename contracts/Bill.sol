pragma solidity ^0.5.1;

contract Bill {
    event Transfer(address indexed from, uint256 value);

    uint256 public amountToPay;
    uint256 public amountLeftToPay;
    uint256 public reasonCaseId;
    address public patient;
    address payable public recipient;
    uint256 public logId;

    constructor (uint256 _amountToPay, uint256 _reasonCaseId, uint256 _logId, address _patient, address payable _recipient) public payable {
        amountToPay = amountLeftToPay = _amountToPay;
        reasonCaseId = _reasonCaseId;
        patient = _patient;
        logId = _logId;
        recipient = _recipient;
    }

    function () external payable {
        require(amountLeftToPay != 0, "Should not be payed");
        require(msg.value > 0, "There should be ether provided within tx");
        require(msg.value <= amountLeftToPay, "Provided more ether than needed");
        amountLeftToPay -= msg.value;
        recipient.transfer(msg.value);
        emit Transfer(msg.sender, msg.value);
    }
}