pragma solidity ^0.4.24;

import "https://github.com/RhombusNetwork/rhombus-demos/blob/master/rhombus/rhombusClient.sol";

contract FundRaiser is RhombusClient {

    struct Donation {
        address donor;
        uint    amountInUSD;
    }

    Donation[] public donations;
    address public constant alice =  0x31EFd75bc0b5fbafc6015Bd50590f4fDab6a3F22;

    event Raised(address donor, uint USDraised);

    // On receiving a donation (in ether), we ask the Rhombus ETH to USD oracle
    // to convert the amount but forward the amount to our favourite charity,
    // Alice's Food Kitchen.

    function () public payable {
        if (msg.value == 0)
            return;
        Donation memory thisDonation;
        thisDonation.donor = msg.sender;
        uint pos = donations.push(thisDonation);
        emitDoubleUint(0, pos-1, msg.value);
        alice.transfer(msg.value);
    }

    // On receiving the USD value, the donation amount is updated and an event
    // emitted. This function can only be called with valid, unused nonces.

    function postUSDvalue(uint index, uint USDvalue) public onlyRhombus {
        require(index < donations.length, "Invalid Index");
        Donation storage d = donations[index];
        require(d.amountInUSD == 0, "Record already updated");
        d.amountInUSD = USDvalue;
        emit Raised(d.donor, d.amountInUSD);
    }

}
