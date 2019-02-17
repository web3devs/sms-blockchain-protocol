const request = require('superagent');

function balance(argsArray, cb) {
  console.log('argsArray', argsArray);
  let url;
  switch (argsArray[1]) {
    case 'xdai':
      url =
        'https://blockscout.com/poa/dai/api?module=account&action=balance&address=0xe8bF424E047372d249d0826c5567655ba3B72f18';
      break;

    case 'buffidai':
      url =
        'https://blockscout.com/poa/dai/api?module=account&action=tokenbalance&contractaddress=0x3e50bf6703fc132a94e4baff068db2055655f11b&address=0xe8bF424E047372d249d0826c5567655ba3B72f18';
      break;

    default:
      url =
        'https://blockscout.com/poa/dai/api?module=account&action=tokenlist&address=0xe8bF424E047372d249d0826c5567655ba3B72f18';
  }
  request.get(url).end(cb);
}

module.exports = balance;
