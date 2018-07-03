const addMonths = require('date-fns/add_months');
const startOfDay = require('date-fns/start_of_day');
const endOfDay = require('date-fns/end_of_day');

module.exports = function(mongoose){
	const Schema = mongoose.Schema;

	var entry_schema = new Schema({
		name: { type: String, required: true},
		cost: { type: Number, required: true },
		date_of: {type: Date, default: Date.now},
		categories: {type: Array, default: []}
	});

	var chronological = function(query){
		return query.sort({date_of: 'asc'});
	}

	entry_schema.query.by_categories = function(has,has_not){
		has = has || [];
		has_not = has_not || [];

		let finder = {categories: {}};
			if(has.length > 0) finder.categories.$all = has;
			if(has_not.length > 0) finder.categories.$not = { $all: has_not };
		
		return chronological(this.find(finder));
	};

	entry_schema.query.between = function(start_date, end_date){
		let start = startOfDay(start_date);
		let end = endOfDay(end_date);

		let finder = { 'date_of': {
			$gte: start,
			$lt: end
		}};

		return chronological(this.find(finder));
	};

	entry_schema.query.by_name = function(name){
		let finder = { 'name': name};

		return chronological(this.find(finder));
	};

	entry_schema.query.fullQuery = function(name, categories, between){
		let finder = {};

		if(name){
			finder.name = name;
		}

		if(categories.has || categories.has_not){
			finder.categories = {};
			if(categories.has) finder.categories.$all = categories.has;
			if(categories.has_not) finder.categories.$not = { $all: categories.has_not };
		}

		if(between.start && between.end){
			finder.date_of = {
				$gte: between.start,
				$lte: between.end
			};
		}

		return chronological(this.find(finder));
	};
	
	return mongoose.model('entry',entry_schema);
}