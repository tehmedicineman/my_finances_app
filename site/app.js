const express = require('express');
const bodyParser = require('body-parser');

var app = express();
const port = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/pages'));
app.use('/tools', express.static(__dirname + '/tools'));
app.use('/scripts', express.static(__dirname + '/pages'));

app.listen(port, () => {
	console.log(`Started on port ${port}...`)
});