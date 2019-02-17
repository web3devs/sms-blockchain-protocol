const request = require('superagent');

/**
 * @path [rates, exchanges, assets]
 * https://docs.shapeshift.io/
 */
function shapeshift(req, cb) {
  // req = [shapeshift, method, arg1, arg2]
  let url = '';

  // POST
  if (req[1] === 'shift' || req[1] === 'sendamount') {
    url = `https://shapeshift.io/${req[1]}`;
    let requestObject = {
      withdrawal: req[2],
      pair: req[3],
    };
    if (req[1] === 'sendamount') {
      requestObject = Object.assign(requestObject, { depositAmount: req[4] });
    }
    // JWT token is hard coded. Should require login first to use these.
    request
      .post(url)
      .send(requestObject)
      .set({
        Accept: 'application/json',
        Authorization: 'Bearer 9uvGiMgjmCMPt9ZoL6jXw3mznHqYQ1dwYXhd5EoQbxnN',
      })
      .end((err, res) => {
        if (err) {
          console.log('RES', res);
          console.log('ERR', err);
          cb(err, res);
        } else {
          console.log('RES.BODY', res.body);
          let message =
            req[1] === 'shift'
              ? `Conduit created. Please send ${res.body.depositType} to ${
                  res.body.deposit
                }`
              : `Conduit created. Please send ${
                  res.body.success.depositAmount
                } to ${res.body.success.deposit}`;
          cb(null, message);
        }
      });
  } else {
    // GET
    if (req[3]) {
      url = `shapeshift.io/${req[1]}/${req[2]}/${req[3]}`;
    } else if (req[2]) {
      url = `shapeshift.io/${req[1]}/${req[2]}`;
    } else if (req[1]) {
      url = `shapeshift.io/${req[1]}`;
    }

    request
      .get(url)
      .set('Accept', 'application/json')
      .end(cb);
  }
}
module.exports = shapeshift;
