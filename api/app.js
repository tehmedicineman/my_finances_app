const express = require('express');
const bodyParser = require('body-parser');
// require('./passport.config');

var app = express();
const port = process.env.PORT || 4444;

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(bodyParser.json());

app.use('/', require('./routes.config.js'));

app.listen(port, () => {
	console.log(`Started on port ${port}...`)
});

module.exports = app;