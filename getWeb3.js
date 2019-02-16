const Web3 = require('web3');

function getWeb3(url) {
  return new Promise(resolve => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(url),
    );
    resolve(web3);
  });
};

export default getWeb3;
