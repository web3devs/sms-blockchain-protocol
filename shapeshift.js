const request = require('superagent');

/**
 * @path [rates, exchanges, assets]
 * https://docs.shapeshift.io/
 */
function shapeshift(req, cb) {
  // req = [shapeshift, method, arg1]
  let url = req[3]
    ? `shapeshift.io/v2/${req[1]}/${req[2]}/${req[3]}`
    : `shapeshift.io/v2/${req[1]}/${req[2]}`;

  if (req[1] === 'shift' || req[1] === 'sendamount') {
    request
      .post(url)
      .send({})
      .set('Content type', 'application/json')
      .set(
        'Authorization',
        'Bearer 9uvGiMgjmCMPt9ZoL6jXw3mznHqYQ1dwYXhd5EoQbxnN',
      )
      .end(cb);
  } else {
    request
      .get(url)
      .set('Content type', 'application/json')
      // .set('Authorization', 'Bearer 9uvGiMgjmCMPt9ZoL6jXw3mznHqYQ1dwYXhd5EoQbxnN')
      .end(cb);
  }
}
module.exports = shapeshift;
