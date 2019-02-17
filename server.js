require('dotenv').config();
const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const tweet = require('./tweet');
const msgConf = require('./msgConf');
const readLighthouse = require('./rhombus');
const coincap = require('./coincap');
const shapeshift = require('./shapeshift');
const balance = require('./balance');
const xdai = require('./xdai');
// const db = require('./db'); // comment out if not running MongoDB
// const User = require('./model.user'); // comment out if not running MongoDB

const app = express();

app.use(bodyParser.urlencoded({ extended: true, type: '*/*' }));

function respond(twiml, res) {
  console.log('TWIML.TOSTRING()', twiml.toString());
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
}

app.post('/sms', (request, response) => {
  // request
  console.log(request.headers);
  console.log(request.body);

  // let user = db.find({ phoneNumber: req.body.From });
  // let user = {
  //   // hard code for now
  //   rinkebyAddress: '0xb37A07ffcd1ec4FBc77583CC176e0809b40ff710',
  //   xdaiAddress: '',
  //   btcAddress: '',
  // };
  // console.log('req', req.body.Body); // parse for cmd and args

  let reqArray = request.body.Body.split(','); // space or comma?
  let argsArray = reqArray.map(arg => {
    return arg.toLowerCase().trim();
  });
  let command = argsArray[0];

  const twiml = new MessagingResponse();

  switch (command) {
    case 'grid':
      // use grid +
      grid(reqArray);
      break;

    case 'tweet':
      // use tweet contract
      tweet(argsArray, (err, res) => {
        if (err) {
          console.log('Error calling tweet function ' + err);
          msgConf(req, err, res);
        } else {
          console.log('Tweet message sent.');
          console.log('RES', res);

          // twiml.message('Tweet sent!' + res); // does not work
          // respond(twiml, response);
          msgConf(request.body, err, res); // takes the place of twiml.message()
        }
      });
      break;

    case 'rhombus':
      // subscribe on unsubscribe to oracles - needs to forward data on
      if (argsArray[1] === 'lighthouse') {
        // TODO rename functions and contracts
        readLighthouse((err, res) => {
          if (err) {
            console.log('Error calling rhombus function ' + err);
            twiml.message('Error: ', err);
          } else {
            // console.log('Message sent.');
            twiml.message(res);
            respond(twiml, response);
          }
        });
      }
      break;

    case 'coincap':
      coincap(argsArray, (err, res) => {
        if (err) {
          console.log('Error calling coincap ' + err);
          twiml.message(err);
          respond(twiml, response);
        } else {
          console.log('Message sent.');
          twiml.message(res);
          respond(twiml, response);
        }
      });
      break;

    case 'shapeshift':
      shapeshift(argsArray, (err, res) => {
        if (err) {
          console.log('Error calling shapeshift ' + err);
          twiml.message(err);
          respond(twiml, response);
        } else {
          twiml.message(res);
          respond(twiml, response);
        }
      });
      break;

    case 'balance':
      balance(argsArray, (err, res) => {
        if (err) {
          console.log('Error calling blockscout ' + err);
        } else {
          console.log('Message sent.');
          console.log('RES.BODY', res.body);
          if (typeof res.body.result === 'string') {
            twiml.message(`${res.body.result / 10 ** 18}`);
          } else if (typeof res.body.result === 'object') {
            twiml.message(
              `${res.body.result[0].balance /
                10 ** res.body.result[0].decimals} ${res.body.result[0].name}`,
            );
          } else {
            twiml.message(
              `Your request didn't match the API: ${typeof res.body.result}`,
            );
          }

          respond(twiml, response);
        }
      });
      break;

    case 'xdai':
      // getUser()
      // can send funds or check balance
      if (argsArray[1] === 'getbalance') {
        xdai.getBalance(argsArray[2], (err, res) => {
          if (err) {
            console.log('RES', res);
            console.log('ERR', err);
            // twiml.message(err);
          } else {
            let message = `$${res} xDai`;
            twiml.message(message);
            respond(twiml, response);
          }
        });
      }
      if (argsArray[1] === 'send') {
        xdai.send(reqArray, user, (err, res) => {
          if (err) {
            console.log('Error sending xdai ' + err);
          } else {
            console.log('xDai sent!');
            console.log('res', res);
            twiml.message(res);
          }
        });
      }
      break;

    default:
      twiml.message('Error. First word must be a command.');
      respond(twiml, response);
  }
});

app.get('/meerkat', (req, res) => {
  // console.log('REQ', req.headers);
  console.log(req); // not showing - empty object
  res.sendStatus(200);
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});
