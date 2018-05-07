const moment = require('moment');

module.exports = function(mongoose){
	const Schema = mongoose.Schema;

	var entry_schema = new Schema({
		name: { type: String, required: true},
		cost: { type: Number, required: true },
		date_of: {type: Date, default: Date.now},
		categories: {type: Array, default: []}
	});

	entry_schema.query.by_categories = function(has,has_not){
		has = has || [];
		has_not = has_not || [];

		let finder = {categories: {}};
			if(has.length > 0) finder.categories.$all = has;
			if(has_not.length > 0) finder.categories.$not = { $all: has_not };
		
		return this.find(finder);
	}

	entry_schema.query.by_month = function(month, year){
		let start = moment().set({
			year,
			month,
			"date": 1
		}).startOf('day');
		let end = moment().set({
			year,
			month: month+1,
			"date": 1
		}).startOf('day');
		let finder = { 'date_of': {
			$gte: start,
			$lt: end
		}};

		return this.find(finder);
	}
	
	return mongoose.model('entry',entry_schema);
}