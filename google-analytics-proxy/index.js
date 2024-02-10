const express = require('express');
const proxy = require('express-http-proxy');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.static(__dirname)); // serve static files from cwd

function getIpFromReq(req) {
  // get the client's IP address
  var bareIP =
    ':' +
    ((req.connection.socket && req.connection.socket.remoteAddress) ||
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      '');
  return (bareIP.match(/:([^:]+)$/) || [])[1].split(',')[0] || '127.0.0.1';
}