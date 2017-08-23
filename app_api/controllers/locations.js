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
        // 20000 meters 
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
  
  Loc.create({
    name: String(req.body.name),
    address: String(req.body.address),
    facilities: String(req.body.facilities).split(','),
    coords: req.body.coords,
    openingTime: [{
      days: String(req.body.days1),
      opening: String(req.body.opening1),
      closing: String(req.body.closing1),
      closed: Boolean(req.body.closed1)
    }, {
      days: String(req.body.days2),
      opening: String(req.body.opening2),
      closing: String(req.body.closing2),
      closed: Boolean(req.body.closed2)
       }]
    },/*end of docs*/
    
    function(err, location){
      if(err){
        sendJsonResponse(res, 400 ,err)
      } 
      else{
        sendJsonResponse(res, 201, location)
      }

  });/*end of Loc create*/
   
};/*end of module.exports.locationsCreate*/

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
        	    });/*end of exec*/
    }
    else{
		sendJsonResponse(res, 404,{"message":"No location in request"});
	}
};


module.exports.locationsUpdateOne = function(req, res){
  
  
  if(!req.params.locationid){
    sendJsonResponse(res, 404, {"message": "locationid not found"});
  }
  Loc
      .findById(req.params.locationid)
      .select('name address facilities coords openingTime')
      .exec(function(err, location){
          if(!location){
              sendJsonResponse(res, 404, {"message": "location not found"});
              return;
            }
          else if (err){
              sendJsonResponse(res, 404, err);
              return;
            }
        
        
          name = String(req.body.name),
          address = String(req.body.address),
          facilities = String(req.body.facilities).split(','),
          coords = req.body.coords,
          openingTime = [{
          days: String(req.body.days1),
          opening: String(req.body.opening1),
          closing: String(req.body.closing1),
          closed: Boolean(req.body.closed1)
          }, {
          days: String(req.body.days2),
          opening: String(req.body.opening2),
          closing: String(req.body.closing2),
          closed: Boolean(req.body.closed2)
          }];

          location.save(function(err, location){
            if(err){
              sendJsonResponse(res, 404, err);
            }
            else{
              sendJsonResponse(res, 200, location);
            }
          }
          
          );// end of location.save 
        }
      );
};

module.exports.locationsDeleteOne = function(req, res){
  
  var locationid = req.params.locationid;
  
  if(locationid){
    Loc
        .findByIdAndRemove(locationid)
        .exec(
          function(err, location){
            if(err){
              sendJsonResponse(res, 404, err);
              return;
            }
            sendJsonResponse(res, 204, null);
          });
  }
  else{
    sendJsonResponse(res, 404, {"message":"locationid not found"});
  }
	
};

