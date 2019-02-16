// get Web3 for rinkeby
const getWeb3 = require("./getWeb3");

let Web3 = getWeb3("https://rinkeby.infura.io");

// get abi and address
let abi = [
  {
    constant: false,
    inputs: [
      {
        name: "tweetString",
        type: "string"
      }
    ],
    name: "tweet",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "tweetString",
    outputs: [
      {
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "tweetString",
        type: "string"
      }
    ],
    name: "chirp",
    type: "event"
  }
];
let address = "0x1d02a7557aeaf16bbdc4b482930b51d76308a235";

let contract = Web3.eth.contract(abi).at(address);

// call tweet function
function tweet(reqArray) {
  let message = reqArray[1];
  contract.tweet(message, (err, res) => {
    if (err) {
      console.log("Error calling tweet function " + err);
    } else {
      console.log("Message sent.");
    }
  });
}
module.exports = tweet;
