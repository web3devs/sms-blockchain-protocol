const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
require('dotenv').config();

const tweet = require('./tweet');
const coincap = require('./coincap');

const app = express();

app.use(bodyParser.urlencoded({ extended: true, type: '*/*' }));

function respond(twiml, res) {
  console.log('TWIML.TOSTRING()', twiml.toString());
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
}

app.post('/sms', (req, response) => {
  // request
  console.log(req.headers);
  // console.log(req.body);
  // let user = db.find({ phoneNumber: req.body.From });
  let user = {
    // hard code for now
    rinkebyAddress: '0xb37A07ffcd1ec4FBc77583CC176e0809b40ff710',
    xdaiAddress: '',
    btcAddress: '',
  };
  // console.log('req', req.body.Body); // parse for cmd and args

  let reqArray = req.body.Body.split(','); // space or comma?

  let command = reqArray[0];

  const twiml = new MessagingResponse();

  switch (command) {
    case 'grid':
      // use grid +
      grid(reqArray);
      break;

    case 'tweet':
      // use tweet contract
      tweet(reqArray, (err, res) => {
        if (err) {
          console.log('Error calling tweet function ' + err);
          twiml.message('Error: ', err);
        } else {
          console.log('Tweet message sent.');
          console.log('RES', res);
          // twiml.message(res.toString()); // does not work
          twiml.message('Tweet sent!' + res); // does not work
          respond(twiml, response);
        }
      });
      break;

    case 'rhombus':
      // subscribe on unsubscribe to oracles - needs to forward data on
      rhombus(reqArray, (err, res) => {
        if (err) {
          console.log('Error calling tweet function ' + err);
          twiml.message('Error: ', err);
        } else {
          // console.log('Message sent.');
          twiml.message(res);
        }
      });
      break;

    case 'coincap':
      coincap(reqArray, (err, res) => {
        if (err) {
          console.log('Error calling tweet function ' + err);
        } else {
          console.log('Message sent.');
          console.log('RES.BODY', res.body);
          // console.log('RES.BODY.TOSTRING()', res.body.toString());
          // console.log(`${res.body}`);
          console.log('JSON.STRINGIFY(RES.BODY)', JSON.stringify(res.body));
          twiml.message(JSON.stringify(res.body));
          respond(twiml, response);
        }
      });
      break;

    // case 'shapeshift':

    // case 'ethql':

    case 'xdai':
      // can send funds or call contract functions
      xdaiSend(reqArray, user, (err, res) => {
        if (err) {
          console.log('Error sending xdai ' + err);
        } else {
          console.log('xDai sent!');
          console.log('res', res);
          twiml.message(res);
        }
      });
      break;

    default:
      twiml.message('Error. First word must be a command.');
      respond(twiml, response);
  }
});

app.post('/meerkat', (req, res) => {
  console.log('REQ', req.headers);
  console.log(req.body); // not showing - empty object
  res.sendStatus(200);
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});
