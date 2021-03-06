var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/lademeuredelarche'; // 27017 PORT PAR DEFAUT DE MONGODB
var retry = null;
mongoose.connect(dburl);

// CONNECTION EVENTS ( PARTIS CONNECTION BASE DE DONNEE)
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dburl);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});


// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
function gracefulShutdown(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
}
// For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function() {
  gracefulShutdown('App termination (SIGINT)', function() {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function() {
  gracefulShutdown('App termination (SIGTERM)', function() {
    process.exit(0);
  });
});
// BRING IN YOUR SCHEMAS & MODELS
require('./models/users.model.js');
require('./models/livre.model.js');
require('./models/home.model.js');
require('./models/chambre.model.js');
require('./models/demeure.model.js');
require('./models/alentours.model.js');
