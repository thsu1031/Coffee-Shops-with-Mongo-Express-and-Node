/*Defining simple Mongoose schemes*/
//var mongoose =  require('mongoose');
var request = require('request');
var apiOptions = {
	server: "http://localhost:3000"
};

if(process.env.NODE_ENV === 'production'){
    apiOptions.server = "https://serene-thicket-75508.herokuapp.com";
};

var formatDistance = function(distance){
	var numDistance, unit;
	numDistance = Math.floor(distance*100)/100;
	unit = ' miles';
	return numDistance + unit;
}

var renderHomepage = function(req, res, responseBody){
	var message;
	if(!(responseBody instanceof Array)){
		message = "API lookup error";
		responseBody = [];
	}else{
		if(!responseBody.length){
			message = "No place found nearby";
		}
	}
	res.render('locations-list',{
		title: 'COFFEE NEAR ME - COFFEE NEAR ME helps you find the best places for a Coffee in Wichita',
		pageHeader:{
			title: 'COFFEE NEAR ME',
			strapline: 'good days srart with you and coffee'
		},
		sidebar:"COFFEE NEAR ME helps you find the best places for a Coffee in Wichita!",
		locationssss: responseBody,
		message: message

	});// end of render 
}

var showError = function(req, res, status){
	
	var title, content;

	if (status===404){
		title = "404, page not found";
		content = "Oh dear, Looks like we cannot find this page. sorry. ";
	}
	else{
		title =  status +" something is going wrong";
		content = "Something is wrong";
	}
	res.status(status);
	res.render('generic-text',{
		title: title,
		content: content
	});
} // end of showError

var getLocationInfo = function(req, res, callback){
	
	var requestOptions, path;
	
	path = "/api/locations/"+ req.params.locationid;

	requestOptions = {
		url: apiOptions.server + path,
		method: "GET", 
		json: {},
	};
    
    request(
    	requestOptions, 
    	function(err, response, body){
    		var data = body;
    		
    		if(response.statusCode === 200){
    			
    			data.coords = {
    				lng: body.coords.lng,
    				lat: body.coords.lat
    			};
    			callback(req, res, data);
    		} else{
    			//console.log('gggggg');
    			showError(req, res, response.statusCode);
    		}
            
    	});// end of request & callback function 

}// end of getLocationInfo

module.exports.homelist = function(req, res){

	var requestOptions, path;
	
	path = '/api/locations';

	requestOptions = {
		url: apiOptions.server + path,
		method: "GET",
		json: {},
		qs: {
			lng: -97.4533247,
			lat: 37.6802974,
			maxDistance: 20000
		}
	};
	//request(options, callback function)
	request(requestOptions, 
		function(err, response, body) {
			var i, data;
			data = body;
			if (response.statusCode === 200 && data.length){
			    for (i=0; i < data.length; i++){
				//console.log('yay');
				data[i].distance = formatDistance(data[i].distance);
			    }
			}
		    renderHomepage(req, res, data);
	    }
	);
}// end of module homelist

var renderDetailPage = function(req, res, locDetail){
	
	res.render('location-info',{
		
		title: locDetail.name,
		pageHeader:{
			title: locDetail.name
		},
		sidebar: {
			context:'COFFEE NEAR ME helps you find the best places for a Coffee in Wichita!',
		    callToAction: 'Please leave a review!'
		},
		
		location: locDetail
	});

} // end of renderDetailPage

module.exports.locationInfo = function(req, res){
	getLocationInfo(req, res, function(req, res, responseData){
		renderDetailPage(req, res, responseData)

	});
  

}; // end of module locationInfo


var renderReviewsForm =  function(req, res, locDetail){
	res.render('location-review-form',{
		title:  'Review ' + locDetail.name + 'on COFFEE NEAR ME',
		pageHeader: { 
			title: 'Review '+ locDetail.name
		}
	});
}

/*GET locationReview page*/
module.exports.addReview = function(req, res){
	getLocationInfo(req, res, function(req, res, responseData){
		renderReviewsForm(req, res, responseData);
	});
}; //end of the module.exports.addReview

/*POST locationReviews page*/
module.exports.doAddReview = function(req, res){
	var requestOptions, path, postdata, locationid;
    locationid = req.params.locationid;

	path = "/api/locations/" + locationid + "/reviews";

	postdata = {
		author: String(req.body.name),
		rating: req.body.rating,
		reviewText: String(req.body.review)
	};

	requestOptions = {
		url: apiOptions.server + path,
		method: "POST",
		json: postdata
	};

	request(requestOptions, function(err, response, body){
		
		if(response.statusCode === 200 || response.statusCode === 201){
			res.redirect('/location/' + locationid);
		}else{
             //console.log('yay');
            showError(req, res, response.statusCode);
		}
	});
}// end of doAddReview
