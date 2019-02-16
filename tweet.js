// get Web3 for rinkeby
const getWeb3 = require("./getWeb3");

let Web3 = getWeb3("https://rinkeby.infura.io");

// get abi and address
let abi = "";
let address = "";

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
