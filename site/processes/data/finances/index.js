const mongoose = require('mongoose');
const default_config = require('./config');

var config;
try {
	var user_config = require(__dirname+'/../../mongoose.config.js');
	config = Object.assign({},default_config,user_config);
}catch (e){
	config = Object.assign({},default_config);
}

//Schemas
	const entry = require('./schemas/entry.mongoose')(mongoose);
	const category = require('./schemas/category.mongoose')(mongoose);


mongoose.Promise = global.Promise;
mongoose.connect(config.connection);

module.exports = {
	mongoose,
	entry,
	category
};