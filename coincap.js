const request = require('superagent');

/**
 * @path [rates, exchanges, assets]
 * api.coincap.io/v2/assets
 * api.coincap.io/v2/assets/bitcoin
 * api.coincap.io/v2/assets/bitcoin/history?interval=d1
 * api.coincap.io/v2/assets/bitcoin/markets
 * api.coincap.io/v2/rates
 * api.coincap.io/v2/rates/bitcoin
 * api.coincap.io/v2/exchanges
 * api.coincap.io/v2/exchanges/kraken
 * https://docs.coincap.io/
 */
function coincap(reqArray, cb) {
  console.log('REQARRAY', reqArray);
  if (
    reqArray[1] != 'assets' &&
    reqArray[1] != 'rates' &&
    reqArray[1] != 'exchanges'
  ) {
    cb('Method not accepted', null);
  }
  let url = '';
  if (reqArray[3]) {
    url = `api.coincap.io/v2/${reqArray[1]}/${reqArray[2]}/${reqArray[3]}`;
    // api.coincap.io/v2/assets/bitcoin/history?interval=d1
    // api.coincap.io/v2/assets/bitcoin/markets
    request.get(url).end((err, res) => {
      if (err) {
        console.log('RES', res);
        console.log('ERR', err);
        cb(err, res);
      } else {
        console.log('RES.BODY', res.body);
        let message = '';

        cb(null, message);
      }
    });
  } else if (reqArray[2]) {
    url = `api.coincap.io/v2/${reqArray[1]}/${reqArray[2]}`;
    // api.coincap.io/v2/assets/bitcoin
    // api.coincap.io/v2/rates/bitcoin
    // api.coincap.io/v2/exchanges/kraken
    request.get(url).end((err, res) => {
      if (err) {
        console.log('RES', res);
        console.log('ERR', err);
        cb(err, res);
      } else {
        console.log('RES.BODY', res.body);
        let message = JSON.stringify(res.body.data, null, 2);
        cb(null, message);
      }
    });
  } else {
    url = `api.coincap.io/v2/${reqArray[1]}`;
    // api.coincap.io/v2/assets
    // api.coincap.io/v2/rates
    // api.coincap.io/v2/exchanges
    request.get(url).end((err, res) => {
      if (err) {
        console.log('RES', res);
        console.log('ERR', err);
        cb(err, res);
      } else {
        console.log('RES.BODY', res.body);
        // long array. grab one key:value and return in pages

        // let message = '';

        cb(null, message);
      }
    });
  }
}
module.exports = coincap;
