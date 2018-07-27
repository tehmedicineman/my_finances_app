const loki = require('lokijs');

class FinanceLDB{

	constructor(data){
		this.db = new loki();
		
		this.entries = this.db.addCollection('entries', { unique: ['_id']});
	}

	LoadAll(data){
		this.entries.insert(data);
	}

	GetByID(id){
		return this.entries.by('_id', id);
	}

	GetByQuery(params){
		if(typeof params === 'undefined') params = {};
		let query = this.entries.chain();

		if(params.name){
			query.find({ 'name': { '$eq': params.name } });
		}

		if(params.include_categories) { //there is no $containsAll, so i need to do these individually
			params.include_categories.forEach(category => {
				query.find({ 'categories': { '$contains': category}});
			});
		}

		if(params.exclude_categories)
			query.find({ 'categories': { '$containsNone': params.exclude_categories} });

		if(typeof params.between !== 'undefined' && (params.between.start && params.between.end)){
			query.find({'date_of': { '$between': [params.between.start, params.between.end] }});
		}

		return query.data();
	}
}

export default FinanceLDB;