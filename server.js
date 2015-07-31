var http = require('http');
var fs = require('fs');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 8080));

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/services', function (req, res) {
	fs.readFile('./services.json', function(err,data){
		if(err){
			res.status(500).send("Services did not load.");
			return;
		}
		res.send(data);
	})
});

app.listen(app.get('port'), function() {
	console.log('Server started: http://localhost:' + app.get('port') + '/');
});

