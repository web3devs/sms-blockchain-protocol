const Web3 = require('web3');

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://rinkeby.infura.io'),
);

let abi = [
  {
    constant: true,
    inputs: [],
    name: 'myLighthouse',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'read',
    outputs: [{ name: 'v', type: 'uint128' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '_myLighthouse', type: 'address' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
];

let address = '0x244F9881680c952ACF16ec07849370289AdeD440';

let reader = web3.eth.contract(abi).at(address);

function readLighthouse(cb) {
  reader.read((err, res) => {
    if (err) {
      console.log('Error reading lighthouse ' + err);
      cb(err, res);
    } else {
      console.log('RES', res);
      let number = res.c[0];
      cb(null, number);
    }
  });
}

module.exports = readLighthouse;
