pragma solidity ^0.4.24;

contract tweeter {

    string public tweetString;

    event chirp (string tweetString);

    constructor(
    )public{
    }

    function tweet(string tweetString) public  {
      emit chirp(tweetString);
    }

}
