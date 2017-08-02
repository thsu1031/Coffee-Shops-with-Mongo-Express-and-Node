var mongoose = require('mongoose');

/*Define a schema for reviews*/
var reviewSchema = new mongoose.Schema({
	author: String,
	rating: {type: Number, required: true, min: 0, max: 5},
	reviewText: String,
	createdOn: {type: Date, default: Data.now}
});

/*Define a schema for opening time*/
var openingTimeSchema = new mongoose.Schema({
    days: {type: String, required: true}, 
    opening: String,
    closing: String,
    closed: {type: Boolean, required: true}
});

/*Start main location schema definition*/
var locationSchema = new mongoose.Schema({
	name: {type: String, required: true},
	rating: {type: Numbrt, required: true, min: 0; max: 5},
	address: String,
	facilities: [String],
	/*Use 2dsphere to add support for GeoJSON longitude and latitude coordinate pairs*/
	coords: {
		type: [Number], 
		index: '2dsphere'
	},
	/*Reference opening times and review schemas to add nested subdocuments*/
	openingTime: [openingTimeSchema],
	reviews: [reviewSchema]
});

mongoose.model('Locstion, locationSchema');