const request = require('superagent');

/**
 * @path [rates, exchanges, assets]
 * https://docs.shapeshift.io/
 */
function shapeshift(req, cb) {
  // req = [shapeshift, method, arg1, arg2]
  let url = '';
  if (req[3]) {
    url = `shapeshift.io/${req[1]}/${req[2]}/${req[3]}`;
  } else if (req[2]) {
    url = `shapeshift.io/${req[1]}/${req[2]}`;
  } else if (req[1]) {
    url = `shapeshift.io/${req[1]}`;
  }

  if (req[1] === 'shift' || req[1] === 'sendamount') {
    request
      .post(url)
      .send({})
      // .set('Content type', 'application/json')
      .set('Accept', 'application/json')
      .set(
        'Authorization',
        'Bearer 9uvGiMgjmCMPt9ZoL6jXw3mznHqYQ1dwYXhd5EoQbxnN',
      )
      .end(cb);
  } else {
    request
      .get(url)
      .set('Accept', 'application/json')
      // .set('Authorization', 'Bearer 9uvGiMgjmCMPt9ZoL6jXw3mznHqYQ1dwYXhd5EoQbxnN')
      .end(cb);
  }
}
module.exports = shapeshift;
