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
function coincap(req, cb) {
  if (req[1] != 'assets' && req[1] != 'rates' && req[1] != 'exchanges') {
    cb('Method not accepted', null);
  }
  let url = '';
  if (req[3]) {
    url = `coincap.io/${req[1]}/${req[2]}/${req[3]}`;
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
  } else if (req[2]) {
    url = `coincap.io/${req[1]}/${req[2]}`;
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
        // if (reqArray[1] === 'assets' && typeof res.body.data !== 'undefined') {
        //   let message = `$${parseFloat(res.body.data.rateUsd, 10).toFixed(2)}`
        // }
        if (reqArray[1] === 'rates' && typeof res.body.data !== 'undefined') {
          let message = `$${parseFloat(res.body.data.rateUsd, 10).toFixed(2)}`
        }
        // if (reqArray[1] === 'exchanges' && typeof res.body.data !== 'undefined') {
        //   let message = `$${parseFloat(res.body.data.rateUsd, 10).toFixed(2)}`
        // }
        cb(null, message);
      }
    });
  } else {
    url = `coincap.io/${req[1]}`;
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
        let
        let message = '';

        cb(null, message);
      }
    });
  }
}
module.exports = coincap;
