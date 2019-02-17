// get Web3 for rinkeby
// const getWeb3 = require('./getWeb3');
const Web3 = require('web3');

const EthereumTx = require('ethereumjs-tx');

// let Web3 = getWeb3('https://rinkeby.infura.io');
// let web3 = new Web3
const web3 = new Web3(
  new Web3.providers.HttpProvider('https://rinkeby.infura.io'),
);

// get abi and address
let abi = [
  {
    constant: false,
    inputs: [
      {
        name: 'tweetString',
        type: 'string',
      },
    ],
    name: 'tweet',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'tweetString',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'tweetString',
        type: 'string',
      },
    ],
    name: 'chirp',
    type: 'event',
  },
];

let address = '0x1d02a7557aeaf16bbdc4b482930b51d76308a235';

// console.log('WEB3', web3);
let contract = web3.eth.contract(abi).at(address);

const nonce = web3.eth.getTransactionCount(
  process.env.ETH_RINKEBY_ADDRESS.toString(),
);
console.log('NONCE', nonce.toString(16));

// call tweet function
function tweet(reqArray, cb) {
  let message = reqArray[1];

  let tweetData = contract.tweet.getData(message);

  const privateKey = Buffer.from(
    process.env.ETH_RINKEBY_PRIVATE_KEY.toString(),
    'hex',
  );

  const nonce = web3.eth.getTransactionCount(
    process.env.ETH_RINKEBY_ADDRESS.toString(),
  );
  console.log('NONCE', nonce.toString(16));

  const txParams = {
    nonce: '0x' + nonce.toString(16),
    gasPrice: web3.eth.gasPrice.toNumber() * 1.1,
    gasLimit: 3000000,
    from: process.env.ETH_RINKEBY_ADDRESS.toString(),
    to: address,
    value: '0x00',
    data: tweetData,
    // EIP 155 chainId - mainnet: 1, ropsten: 3
    chainId: 4,
  };

  const tx = new EthereumTx(txParams);
  tx.sign(privateKey);
  const serializedTx = tx.serialize();

  web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), cb);
}
module.exports = tweet;
