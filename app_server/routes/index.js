var express = require('express');
var router = express.Router();
// require main controllers file 
var ctrlMain = require('../controllers/main');

/* GET home page. */
//router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
//});

/*Controllers should manage the application logic, and routing should map URL
rewuests to the controllers*/

var homeController = function(req, res){
    res.render('index', {title: 'Express'});
};

/*GET home page*/
//router.get('/', homeController);
// Reference index method of controllers in route definition 
router.get('/', ctrlMain.index);

module.exports = router;
