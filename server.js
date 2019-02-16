const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const grid = require('grid');
const tweet = require('tweet');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  // request
  console.log(req.body.From); // look up user
  // let user = db.find({ phoneNumber: req.body.From });
  let user = { // hard code for now
    rinkebyAddress: '',
    xdaiAddress: '',
    btcAddress: ''
  }
  console.log('req', req.body.Body); // parse for cmd and args

  let reqArray = req.body.Body.split(' '); // space or comma?

  let command = reqArray[0];

  const twiml = new MessagingResponse();

  switch (command) {
    case 'grid':
      // use grid +
      grid(reqArray);
      break;

    case 'tweet':
      // use tweet contract
      tweet(reqArray);
      break;

    case 'rhombus':
      // subscribe on unsubscribe to oracles - needs to forward data on
      rhombus(reqArray);
      break;

    case 'salt':

    case 'shapeshift':

    case 'ethql':

    case 'xdai':
      // can send funds or call contract functions
      try {
        xdaiSend(reqArray, user);

      } catch(err) {
        twiml.message('Error: ', err);
      };
  }

  // response


  // twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});
