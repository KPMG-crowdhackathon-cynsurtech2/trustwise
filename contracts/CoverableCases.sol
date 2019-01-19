pragma solidity ^0.5.1;

contract CoverableCases {
    mapping (uint256=>string) public coverableCase;

    constructor () public {
        coverableCase[0] = "Case 0";
        coverableCase[1] = "Case 1";
        coverableCase[2] = "Case 2";
        coverableCase[3] = "Case 3";
        coverableCase[4] = "Case 4";
        coverableCase[5] = "Case 5";
        coverableCase[6] = "Case 6";
        coverableCase[7] = "Case 7";
        coverableCase[8] = "Case 8";
        coverableCase[9] = "Case 9";
    }
}
