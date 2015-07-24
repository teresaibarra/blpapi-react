var http = require('http');
var fs = require('fs');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 8080));

app.use('/', express.static(path.join('.')));

// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
  console.log("get");
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage');
  console.log("set");
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

