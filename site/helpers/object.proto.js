Object.prototype.ferEach = function(iterator){
	if(typeof this.forEach !== 'function'){
		Object.keys(this).forEach((key) => {
			iterator(this[key],key,this);
		})
	}else{
		this.forEach(iterator);
	}
}