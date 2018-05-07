const router = require('express').Router();
var passport = require('passport');
const {ObjectID} = require('mongodb');

const {entry} = require('../apps/finances');

router.get('/', (request, response) => {
	entry.find().then((docs) => {
		if(!docs) return response.status(404).send();

		response.send({
			entries: docs
		});
	});
});

router.get('/:id', (request, response) => {
	let id = request.params.id;

	if(!ObjectID.isValid(id)) return response.status(404).send();

	entry.findById(id).then((doc) => {
		if(!doc) return response.status(404).send();

		response.send({
			entry: doc
		});
	});
});

router.get('/month/:month/:year?', (request, response) => {
	let month = parseInt(request.params.month) - 1;
	let year = parseInt(request.params.year) || new Date().getFullYear();

	if(typeof month !== 'number' || month < 0 || month > 11) return response.status(404).send({'error': "Not a valid month.", month});
	if(typeof year !== 'number') return response.status(404).send({'error': "Not a valid year.", year});

	entry.find().by_month(month,year).then((docs) => {
		if(!docs) return response.status(404).send();

		response.send({
			total: docs.length,
			entries: docs
		});
	});
});

router.get('/filter/:has/:has_not?', (request, response) => {
	let has = request.params.has.split(';');
	let has_not = request.params.has_not ? request.params.has_not.split(';') : [];

	if(typeof has !== 'object' || has.length < 1) return response.status(404).send({'error': "Valid arguments required.", has});
	if(typeof has_not !== 'object') return response.status(404).send({'error': "Valid arguments required.", has_not});

	entry.find().by_categories(has,has_not).then((docs) => {
		if(!docs) return response.status(404).send();

		response.send({
			total: docs.length,
			entries: docs
		});
	});
});

router.post('/', (request, response) => {
	var data = {
		name: request.body.name,
		cost: request.body.cost,
		date_of: request.body.date_of,
		categories: request.body.categories
	};

	console.log(request.body);
	var item = new entry(data);

	item.save().then((doc) => {
		response.status(201).send(doc);
	}).catch((err) => {
		response.status(400).send(err);
	})
});

router.delete('/:id', (request, response) => {
	let id = request.params.id;

	if(!ObjectID.isValid(id)) return response.status(404).send({error: "Invalid ID."});

	entry.findByIdAndRemove(id).then((removed) => {
		if(!removed) return response.status(404).send();
		response.send({removed});
	}).catch((err) => {
		response.status(400).send();
	});
})

router.put('/:id', (request, response) => {
	let id = request.params.id;
	var data = {
		name: request.body.name,
		cost: request.body.cost,
		date_of: request.body.date_of,
		categories: request.body.categories
	};

	if(!ObjectID.isValid(id)) return response.status(404).send({error: "Invalid ID."});

	entry.findByIdAndUpdate(id,{$set: data}, { new: true }).then((todo) => {
		if(!todo) return response.status(404).send();
		response.send({todo});
	}).catch((err) => {
		response.status(400).send();
	});
})

module.exports = router;