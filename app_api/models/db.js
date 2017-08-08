/*Define database conection string and use it to open Mongoose connection */
var mongoose = require('mongoose');
var gracefulShutdown;

var dbURI = 'mongodb://localhost/coffee'

if (process.env.NODE_ENV ==='production'){
    dbURI = 'mongodb://heroku_djlvk5cr:g2c58uctobcvfshl91lndmcv2f@ds163010.mlab.com:63010/heroku_djlvk5cr'
}

mongoose.connect(dbURI);

/*Listen for Mongoose connection events and output statuses to console*/
mongoose.connection.on('connected', function(){
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err){
    console.log('Mongoose connection error' + err);
});

mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected');

});

/*Reuseable function to close Mongoose connection*/

gracefulShutdown = function(msg, callback){
    mongoose.connection.close(function(){
    	console.log('Mongoose disconnected through'+msg);
    	callback();
    });

};

/*Listen to Node processes for termination or restart signals and call gracefulShutdown function when
appropriate, pass a continuation callback*/

/*If the node process ends, close the Mongoose connection*/

/*For nodemon  retarts*/
process.once('SIGUSR2',  function(){
  gracefulShutdown('nodemon restart', function(){
  	process.kill(process.pid, 'SIGUSR2');

  });
});

/*For app termination*/

/*If the Node process ends, close the Mongoose connection*/
process.on('SIGINT',  function(){
	gracefulShutdown('app termination', function(){
		process.exit(0);

	});

});

/*For Heroku app termination*/
process.on('SIGINT', function(){
    gracefulShutdown('Heroku app shutdown', function(){
    	process.exit(0);

    });

});



/*If the node process ends, close the Mongoose connection*/
require('./locations');