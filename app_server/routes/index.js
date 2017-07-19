var express = require('express');
var router = express.Router();
// require main controllers file 
//var ctrlMain = require('../controllers/main');
var ctrLocations = require('../controllers/locations');
var ctrOthers = require('../controllers/others');
// have two variables we can use reference in the route definition,
// which will contain different collection of routes 


/*Locations pages*/
router.get('/', ctrLocations.homelist);
router.get('/location', ctrLocations.locationInfo);
router.get('/location/review/new', ctrLocations.addReview);

/*Other pages*/
router.get('/about', ctrOthers.about);


/* GET home page. */
//router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
//});


/*Controllers should manage the application logic, and routing should map URL
rewuests to the controllers*/

//var homeController = function(req, res){
    //res.render('index', {title: 'Express'});
//};

/*GET home page*/
//router.get('/', homeController);
// Reference index method of controllers in route definition 
///router.get('/', ctrlMain.index);

module.exports = router;
