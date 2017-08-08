var express =  require('express');
var router = express.Router();
var ctrLocations = require('../controllers/locations');
var ctrReviews = require('../controllers/reviews');

//locations Define routes for locations 
router.get('/locations', ctrLocations.locationsListByDistance);
router.post('/locations', ctrLocations.locationsCreate);
router.get('/locations/:locationid', ctrLocations.locationsReadOne);
router.put('/locations/:locationid', ctrLocations.locationsUpdateOne);
router.delete('/locations/:locationid', ctrLocations.locationsDeleteOne);


// reviews Define routes for reviews
router.post('/locations/:locationid/reviews', ctrReviews.reviewsCreate);
router.get('/locations/:locationid/reviews/:reviewid', ctrReviews.reviewsReadOne);
router.put('/locations/:locationid/reviews/:reviewid', ctrReviews.reviewsUpdateOne);
router.delete('/locations/:locationid/reviews/:reviewid', ctrReviews.reviewsDeleteOne);


// export routes 
module.exports = router;

