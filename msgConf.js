require('dotenv').config();
const http = require('http');
const express = require('express');
const twilio = require('twilio');
var client = new twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

function msgConf(req, err, res) {
  if (err) {
    client.messages
      .create({
        body: `error: ${err}`,
        // to: '+12092104311',
        to: req.From,
        from: '+12399323767',
      })
      .then(message => console.log(message.sid));
  } else {
    client.messages
      .create({
        body: `https://rinkeby.etherscan.io/tx/${res}`,
        // to: '+12092104311',
        to: req.From,
        from: '+12399323767',
      })
      .then(message => console.log(message.sid));
  }
}

module.exports = msgConf;
