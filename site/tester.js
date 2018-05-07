const {entry} = require('./mongoose');
require('./helpers/array.proto');

entry.find().by_categories(['Groceries']).then((docs) => {
	var other_stuff = docs.filter((d) => d.categories.length > 1)
	console.log('Groceries!',docs.length);
	console.log('Other Stuff!',other_stuff.length);
});

entry.find().then((docs) => {
	var cats = docs
				.reduce((arr, val) => arr.concat(val.categories),[]) //get array of categories
				.uniqueify();
	console.log('All Categories:',cats);
})

entry.find().then((docs) => {
	var names = docs
				.reduce((arr, val) => {console.log(arr,val); arr.push(val.name); return arr;},[]) //get array of categories
				.countify();
	console.log('Unique record Counts:',names);
})