// web3 for xdai
const getWeb3 = require('getWeb3');

let Web3 = getWeb3('https://dai.poa.network');

// contract

// get abi and address
let abi = '';
let address = '';

let contract = Web3.eth.contract(abi).at(address);

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
export function send(reqArray, user) {
  let transactionObject = {
    from: user.xdaiAddress,
    to: '',
    value: '',
    gas: ''
  };

  web3.eth.sendTransaction(transactionObject, (err, res) => {
    if (err) {
      console.log('Error calling tweet function ' + err)
      throw new Error(err);
    } else {
      console.log('Message sent.');
    };
  });
}
