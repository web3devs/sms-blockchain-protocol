// web3 for xdai
const Web3 = require('web3');

const EthereumTx = require('ethereumjs-tx');

const xdaiWeb3 = new Web3(
  new Web3.providers.HttpProvider('https://dai.poa.network'),
);

const xdai = {
  // store wallet in DB
  loadWallet: () => {},
  // store private key
  loadPKey: () => {},
  // get balance of provided address - any
  getBalance: (address, cb) => {
    xdaiWeb3.eth.getBalance(address, (err, res) => {
      if (err) {
        console.log('RES', res);
        console.log('ERR', err);
        cb(err, res);
      } else {
        console.log('RES', res);
        cb(null, xdaiWeb3.fromWei('' + res, 'ether'));
      }
    });
  },
  // send from users wallet to provided address
  send: (argArray, user, cb) => {
    // reqArray = [xdai, send, toAddress, value]
    const privateKey = Buffer.from(user.xdai.pKey, 'hex');

    const nonce = xdaiWeb3.eth.getTransactionCount(user.xdai.address);
    console.log('NONCE', nonce.toString(16));

    const txParams = {
      nonce: '0x' + nonce.toString(16),
      gasPrice: web3.eth.gasPrice.toNumber() * 1.1,
      gasLimit: 3000000,
      from: user.xdai.address,
      to: argArray[2],
      value: '0x' + argArray[3].toString(16),
      chainId: 100,
    };

    const tx = new EthereumTx(txParams);
    tx.sign(privateKey);
    const serializedTx = tx.serialize();

    xdaiWeb3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), cb);
  },
};
module.exports = xdai;
