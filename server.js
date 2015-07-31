var http = require('http');
var fs = require('fs');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 8080));

app.use('/', express.static(path.join('.')));

app.listen(app.get('port'), function() {
	console.log('Server started: http://localhost:' + app.get('port') + '/');
});

