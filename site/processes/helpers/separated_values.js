var fs = require('fs');

module.exports = function( derpa, config ){
	// config and defaults
		let separater = config.separater || ",";
		let pattern = new RegExp("(\\" + separater + "|\\r?\\n|\\r|^)(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|([^\"\\" + separater + "\\r\\n]*))","gi");
		let returner = [[]];
		let matches = null;
	//lookup our data
		let full_data;
		if(config.file === true){
			if(!fs.existsSync(derpa)) return null; //no file
			full_data = fs.readFileSync(derpa,"utf8");
			if(!full_data) return null; //no data
		}else{
			full_data = derpa;
		}

	
	while (matches = pattern.exec( full_data )){
		//decide when to flip to a new line
			let matched_separater = matches[1];
			if(matched_separater.length && matched_separater !== separater){ 
				returner.push([]);
			}
		//get the actual matched content and plug it in
			let match;
			if(matches[2]){
				match = matches[2].replace(/\"\"/g,"\"");
			}else{
				match = matches[3];
			}
			returner[returner.length - 1].push(match);
	}

	//if we have headers, use them
		if(config.headers){
			let headers = returner[0];
			let headered = [];
			returner.forEach((line, key) => {
				if(key === 0) return; //ignore the headers
				let new_line = {};
				line.forEach((data, k) => {
					new_line[headers[k]] = data;
				});
				headered.push(new_line);
			})
			returner = headered;
		}
	return returner;
};