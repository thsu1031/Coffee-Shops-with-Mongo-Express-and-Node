/*GET home page*/
module.exports.homelist =  function(req, res){

	res.render('locations-list', {title: 'Home'})
}

/*GET locationInfo page*/
module.exports.locationInfo = function(req, res){

	res.render('location-info', {title: 'Details'});
}

/*GET locationReview page*/
module.exports.addReview = function(req, res){

	res.render('index', {title: 'Add review'});
}