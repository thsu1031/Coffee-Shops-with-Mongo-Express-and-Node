/*Defining simple Mongoose schemes*/
var mongoose =  require('mongoose');
/*GET home page*/
module.exports.homelist =  function(req, res){

	res.render('locations-list', {
		title: 'COFFEE NEAR ME - COFFEE NEAR ME helps you find the best places for a Coffee in Wichita!',
		pageHeader: {
			title: 'COFFEE NEAR ME',
			strapline: 'good days srart with you and coffee'
		},
		sidebar: "COFFEE NEAR ME helps you find the best places for a Coffee in Wichita!",
		locations: [
		{
			name: 'Verita Coffee Bar & Roastery',
			address: '9414 W Central Ave, Wichita, KS 67212',
			rating: 5,
			facilities: ['Prepared foods','Coffee','College students'],
			distance: '100m'
	
		},{
			name: 'Ecclesia Coffee & Community ',
			address: '7130 W Maple St #280, Wichita, KS 67209',
			rating: 4,
			facilities: ['Quick bite','College students','Great dessert'],
			distance: '200m'
		},{
			name: "Scooter's Coffee",
			address: '7399 W Central Ave, Wichita, KS 67212',
			rating: 3, 
			facilities: ['Prepared food','Coffee','College students'],
			distance: '300m'
		}
		]

	});
};

/*GET locationInfo page*/
module.exports.locationInfo = function(req, res){

	res.render('location-info', {
		title: 'Verita Coffee Bar & Roastery',
		pageHeader: {
			title: 'Verita Coffee Bar & Roastery',
		},
		sidebar: {
		    context:'COFFEE NEAR ME helps you find the best places for a Coffee in Wichita!',
		    callToAction: 'Please leave a review!'
	},
	location:{
		name: 'Verita Coffee Bar & Roastery',
		rating: 5,
		address: '9414 W Central Ave, Wichita, KS 67212',
		facilities: ['Prepared foods', 'Coffee', 'College students'],
		coords:{
			lat: 37.69489,
			lng:-97.243174
		},
		openingTime:[{
			days: 'Monday - Saturday',
			opening: '7:00',
			closing: '19:00',
			closed: false
		},{
			days: 'Sunday',
			closed: true
		}],
		reviews:[{
			author: 'Ting', 
			rating: 5,
			timestamp: '7/26/2017',
			reviewText: 'Love it here!!'
		},{
			author: 'Shane',
			rating: 5,
			timestamp: '7/26/2017',
			reviewText: 'Free wifi is the best!'

		}]

      } /*end of location*/

	}); /*end of render*/
}; /*end of module.exports.locationInfo*/



/*GET locationReview page*/
module.exports.addReview = function(req, res){

	res.render('location-review-form', {

		title: 'Review Verita Coffee Bar & Roastery on COFFEE NEAR ME',
		pageHeader:{
			title: 'Review Verita Coffee Bar & Roastery'
		}

	});/*end of the res.render-location-review-form*/
}; /*end of the module.exports.addReview*/