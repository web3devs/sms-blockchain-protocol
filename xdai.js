// web3 for xdai
const getWeb3 = require('getWeb3');

let Web3 = getWeb3('https://dai.poa.network');

// contract

// get abi and address
// let abi = '';
// let address = '';
//
// let contract = Web3.eth.contract(abi).at(address);

// call tweet function
// export function tweet(reqArray) {
//   let message = reqArray[1];
//   contract.tweet(message, (err, res) => {
//     if (err) {
//       console.log('Error calling tweet function ' + err)
//     } else {
//       console.log('Message sent.');
//     };
//   });
// };

// send
export function send(reqArray, user, cb) {
  // reqArray = [xdai, send, toAddress, value]
  let transactionObject = {
    from: user.xdaiAddress,
    to: reqArray[2],
    value: reqArray[3],
    gas: 3000000,
  };

  web3.eth.sendTransaction(transactionObject, cb);
}
