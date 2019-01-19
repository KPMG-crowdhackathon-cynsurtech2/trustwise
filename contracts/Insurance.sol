pragma solidity ^0.5.1;

import "./Bill.sol";

contract Insurance {
    uint256[] coveredCases;
    address public insurer;
    address public client;
    uint256 public expiryDate;
    uint256 public maxPayout;

    constructor (address _insurer, address _client, uint256 _expiryDate, uint256 _maxPayout, uint256[] memory _coveredCases) public payable {
        require(msg.value == _maxPayout, "");
        insurer = _insurer;
        client = _client;
        expiryDate = _expiryDate;
        maxPayout = _maxPayout;
        coveredCases = _coveredCases;
    }

    function payTheBill(address payable bill) public {
        Bill b = Bill(bill);
        require(b.patient() == client, "Patient should be the client");
        uint256 caseId = b.reasonCaseId();
        bool found = false;
        for (uint256 i = 0; i < coveredCases.length; ++i) {
            if (caseId == coveredCases[i]) {
                found = true;
            }
        }
        require(found, "The case is not coverable by this insurance");
        uint256 amountToPay = b.amountLeftToPay();
        uint256 amountToPayout;

        if (amountToPay > maxPayout) {
            amountToPayout = maxPayout;
        } else {
            amountToPayout = amountToPay;
        }

        address(b).transfer(amountToPayout);
        
    }

    function getCoveredCases() public view returns (uint256[] memory) {
        return coveredCases;
    }
}
