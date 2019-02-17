pragma solidity ^0.4.25;

interface ILighthouse {

    // function read() external view returns (bytes32 x);

    function peekData() external view returns (uint128 v,bool b);
}

contract reader {

    ILighthouse  public myLighthouse;        // Lighthouse to obtain a random number

    // address public constant LhAddress = 0x613D2159db9ca2fBB15670286900aD6c1C79cC9a;

    constructor(ILighthouse _myLighthouse) public {
         myLighthouse = _myLighthouse;
     }

    function read() public view returns (uint128 v) {
        uint128 winningNumber;
        bool ok;
        (winningNumber, ok) = myLighthouse.peekData(); // obtain random number from Rhombus Lighthouse
        return winningNumber;
    }

}
