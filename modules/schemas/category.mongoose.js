module.exports = function(mongoose){
	const Schema = mongoose.Schema;

	var category_schema = new Schema({
		name: { type: String, required: true }
	});
	
	return mongoose.model('category', category_schema);
}