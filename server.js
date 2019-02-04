const PROJECT_NAME = '/betca-tpv-spring';
const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);

app.use(express.static(__dirname + '/dist' + PROJECT_NAME));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

server.listen(process.env.PORT || 8081, () =>
  console.log('Running with Express... http://localhost:8081/'));
