const router = require('express').Router();
var passport = require('passport');
const {ObjectID} = require('mongodb');
var isValid = require('date-fns/is_valid');

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

router.get('/between/:start/:end', (request, response) => {
	let start = new Date(request.params.start + " 00:00:00");
	let end = new Date(request.params.end + " 00:00:00");

	if(start == 'Invalid Date') return response.status(404).send({'error': "Not a valid start date."});
	if(end == 'Invalid Date') return response.status(404).send({'error': "Not a valid end date."});

	entry.find().between(start, end).then((docs) => {
		if(!docs) return response.status(404).send();

		response.send({
			total: docs.length,
			entries: docs,
			derp: (parseInt(request.params.month) - 1),
			month: new Date().getMonth()
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

router.get('/name/:name', (request, response) => {
	let name = request.params.name || false;

	if(!name) return response.status(404).send({'error': "Name argument required."});

	entry.find().by_name(name).then((docs) => {
		if(!docs) return response.status(404).send();

		response.send({
			total: docs.length,
			entries: docs
		});
	});
});

router.post('/query', (request, response) => {
	let name = request.body.name;
	let categories = {
		has: request.body.has,
		has_not: request.body.has_not
	};
	let between = {
		start: request.body.start,
		end: request.body.end
	};

	if(!name && !categories.has && !categories.has_not && !between.start && !between.end) return response.status(404).send({'error': "Query request requires atleast 1 valid parameter."});

	entry.find().fullQuery(name, categories, between).then((docs) => {
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