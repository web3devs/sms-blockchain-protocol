const request = require('superagent');

function coincap(req, cb) {
  // reqArray = [coincap, path, id, path2]
  let url = req[3]
    ? `api.coincap.io/v2/${req[1]}/${req[2]}/${req[3]}`
    : `api.coincap.io/v2/${req[1]}/${req[2]}`;
  request.get(url).end(cb);
}

module.exports = coincap;
