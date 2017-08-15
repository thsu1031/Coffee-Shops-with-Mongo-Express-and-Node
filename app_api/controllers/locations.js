var mongoose = require('mongoose');

var Loc = mongoose.model('Location');

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
}


/*var getDistanceFromRads = function(rads) {
    var earthRadius = 6378000;
    return parseFloat(rads * earthRadius);
};

var getRadsFromDistance = function(distance){
    var earthRadius = 6378000;
    return parseFloat(distance / earthRadius);
};*/


module.exports.locationsListByDistance = function(req, res){

    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);


    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };

    var geoOptions = {
        spherical: true,
        // 10000 meters 
        maxDistance: 20000,
        num: 10
    };

    if(!lng||!lat){
        sendJsonResponse(res, 404,{
            "message":"lng and lat query parameters are reqiored"
        });
         return;
    }/*end if if */
Loc.geoNear(point, geoOptions, function(err, results, status){
    var locations = [];
    if (err){
        sendJsonResponse(res, 404, err);
    }
    else {
        results.forEach(function(doc){
        locations.push({
            //distance: getDistanceFromRads(doc.dis),
            // in miles 
            distance: doc.dis*0.000621371,
            name: doc.obj.name,
            address: doc.obj.address,
            rating: doc.obj.rating,
            facilities: doc.obj.facilities,
            _id: doc.obj._id
       }); /*end of location push*/
    });/*end of results.forEach*/
    sendJsonResponse(res, 200, locations);
  }
});/*end of geoNear*/

};


module.exports.locationsCreate = function(req, res){
   sendJsonResponse(res, 200, {"status":"success"});
};

module.exports.locationsReadOne = function(req, res){
	if (req.params && req.params.locationid){
		 Loc
            .findById(req.params.locationid)

            .exec(function(err, location){
            	if (!location){
            		sendJsonResponse(res, 404,{"message":"locationid not found"});
            		return;
            	} 
            	else if (err){
            		sendJsonResponse(res, 404, err);
            		return;
            	}
            	//console.log(req.params.locationid);
        	    sendJsonResponse(res, 200, location);
        	      });
	}
	else
	{
		sendJsonResponse(res, 404,{"message":"No location in request"});
	}
};

module.exports.locationsUpdateOne = function(req, res){
	sendJsonResponse(res, 200, {"status":"success"});
};

module.exports.locationsDeleteOne = function(req, res){
	sendJsonResponse(res, 200, {"status":"success"});
};

