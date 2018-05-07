Array.prototype.uniqueify = function(){
	return this.filter((value, index, self) => self.indexOf(value) === index);
}

Array.prototype.countify = function(factor){
	var cumulate = (acc,key) => {
		if(typeof acc[key] === 'undefined') acc[key] = 0;
		acc[key] = acc[key] + 1;
		return acc;
	}
	return this.reduce((acc, record) => {
		let grouping = factor(record);
		if(typeof grouping === 'object' && typeof grouping.forEach === 'function'){
			grouping.forEach((group) => {
				acc = cumulate(acc,group);
			});
		}else{
			acc = cumulate(acc,grouping);
		}
		return acc;
	},{});
}

Array.prototype.groupify = function(factor){
	var cumulate = (acc,key,val) => {
		if(typeof acc[key] === 'undefined') acc[key] = [];
		acc[key].push(val);
		return acc;
	}
	return this.reduce((acc, record) => {
		let grouping = factor(record);
		if(typeof grouping === 'object' && typeof grouping.forEach === 'function'){
			grouping.forEach((group) => {
				acc = cumulate(acc,group,record);
			});
		}else{
			acc = cumulate(acc,grouping,record);
		}
		return acc;
	},{});
}