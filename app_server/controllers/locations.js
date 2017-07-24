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

	res.render('location-info', {title: 'Details'});
};

/*GET locationReview page*/
module.exports.addReview = function(req, res){

	res.render('location-review-form', {title: 'Add review'});
};