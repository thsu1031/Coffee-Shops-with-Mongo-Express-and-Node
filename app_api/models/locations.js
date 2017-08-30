var mongoose = require('mongoose');


/*Define a schema for reviews*/
var reviewSchema = new mongoose.Schema({
	author: {type: String},
	rating: {type: Number,  min: 0, max: 5},
	reviewText: {type: String},
	createdOn: {type: Date, "Default": Date.now}
});

/*Define a schema for opening time*/
var openingTimeSchema = new mongoose.Schema({
    days: {type: String}, 
    opening: {type:String},
    closing: {type: String},
    closed: {type: Boolean}
});

/*Start main location schema definition*/
var locationSchema = new mongoose.Schema({
	name: {type: String},
	address: String,
	rating: {type: Number,"default":0,  min: 0, max: 5},
	facilities: [String],
	/*Use 2dsphere to add support for GeoJSON longitude and latitude coordinate pairs*/
	 /*coords: {
		type: [Number], 
		index: '2dsphere'
	},*/
	coords: [Number],

	/*Reference opening times and review schemas to add nested subdocuments*/
	openingTime: [openingTimeSchema],
	reviews: [reviewSchema]
});

mongoose.model('Location', locationSchema);