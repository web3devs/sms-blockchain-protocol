const request = require('superagent');

/**
 * @path [rates, exchanges, assets]
 * https://docs.coincap.io/
 */
function coincap(req, cb) {
  // reqArray = [coincap, path, id, path2]  id = currency
  // requests without id return arrays too long to SMS. Need to map one k:v
  let url = req[3]
    ? `api.coincap.io/v2/${req[1]}/${req[2]}/${req[3]}`
    : `api.coincap.io/v2/${req[1]}/${req[2]}`;
  request.get(url).end(cb);
}
module.exports = coincap;
