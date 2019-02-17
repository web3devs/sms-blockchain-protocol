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
  // req = [coincap, path, id, path2]  id = currency
  // requests without id return arrays too long to SMS. Need to map one k:v
  // let url = req[3]
  //   ? `api.coincap.io/v2/${req[1]}/${req[2]}/${req[3]}`
  //   : `api.coincap.io/v2/${req[1]}/${req[2]}`;
  let url = '';
  if (req[3]) {
    url = `coincap.io/${req[1]}/${req[2]}/${req[3]}`;
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
  } else if (req[1]) {
    url = `coincap.io/${req[1]}`;
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
  }
}
module.exports = coincap;
