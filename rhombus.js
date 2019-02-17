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
