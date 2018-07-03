class DataGroupifier{

	constructor(data){
		this.data = data;
		this.group = null;
		this.callback_results = null;
	}

	groupBy(type,key,qualifier){
		switch(type){
			case "value":
				return this.groupByValue(key);
				break;
			case "date":
				// return this.groupByDate(key,qualifier);
				return [];
				break;
			case "array":
				return this.groupByArray(key,qualifier); // qualifiers would be "all" and "some"
				break;
			default:
				return [];
				break;
		}
	}

	groupByValue(key){
		var newGroup = [];

		newGroup = this.data.reduce((acc, val) => {
			if(typeof acc[val[key]] === 'undefined') acc[val[key]] = [];
			acc[val[key]].push(val);
			return acc;
		},{});

		this.group = Object.assign([],newGroup);
		
		return newGroup;
	}

	groupByArray(key, qualifier){
		var newGroup = [];

		newGroup = this.data.reduce((acc, val) => {
			if(qualifier === 'all'){
				var cat = val[key].join('|');
				if(typeof acc[cat] === 'undefined') acc[cat] = [];
				acc[cat].push(val);
			}else{
				val[key].forEach((cat) => {
					if(typeof acc[cat] === 'undefined') acc[cat] = [];
					acc[cat].push(val);
				})
			}
			return acc;
		},{});

		this.group = Object.assign([],newGroup);
		
		return newGroup;
	}

	then(callback){
		this.callback_results = callback(this.group);
		return this.callback_results;
	}

	results(){
		return this.callback_results;
	}
}

export default DataGroupifier;