const fs = require('fs');

const {mongoose, entry} = require('./data/finances');
const sv = require('./helpers/separated_values');


// check if the file is there
	var values = sv('./docs/bulk.txt',{
		"separater": "\t",
		"file": true
	});
	if(!values) {
		mongoose.disconnect();
		console.log('No File.');
		return;
	};

// do the stuff
	var saved = [];
	values.forEach((record) => {
		let new_entry = new entry({
			name: record[0],
			cost: record[1].slice(1,9001),
			categories: record[2].split('; '),
			date_of: new Date(record[3])
		});
		new_entry.save().then((doc) => {
			saved.push(true);
			finish();
		})
		// console.log(new_entry);
	});


function finish(){
	console.log("Documents left: ",values.length - saved.length);
	if(saved.length == values.length){
		fs.unlink('./docs/bulk.txt', () => {
			mongoose.disconnect();
			console.log('File removed.');
		});
	}
}