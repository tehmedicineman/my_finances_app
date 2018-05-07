const mongoose = require('mongoose');
const {connection} = require('./config');
const default_config = require('./config');

var config;
try {
	var user_config = require(__dirname+'/../mongoose.config.js');
	config = Object.assign({},default_config,user_config);
}catch (e){
	config = Object.assign({},default_config);
}


//Schemas
	const entry = require('./schemas/entry.mongoose')(mongoose);
	const category = require('./schemas/category.mongoose')(mongoose);


mongoose.Promise = global.Promise;
mongoose.connect(connection);

module.exports = {
	mongoose,
	entry,
	category
};
// "mongodb://udemytest:sIY4J7Ob89JH@ds135619.mlab.com:35619/todo_app"
//"mongodb://localhost:27017/todo_app"