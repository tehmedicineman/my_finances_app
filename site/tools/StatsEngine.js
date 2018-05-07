class StatsEngine{

	constructor(){
	}

	get_stats(group){
		if(group == null) return false;
	
		stats = {};
		
		Object.keys(group).forEach((key) => {
			var returner = {sum: 0, count: group[key].length, records: Object.assign([],group[key])};
			group[key].forEach((record) => {
				returner.sum = math.add(returner.sum,record.cost);
			});
			returner.sum = math.round(returner.sum,2);
			stats[key] = returner;
		});
		return stats;
	}
}