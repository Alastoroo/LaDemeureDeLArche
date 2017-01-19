var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User     = mongoose.model('User');
var bcrypt   = require('bcrypt-nodejs');

module.exports = function(app, passport) {

  //=============================================================
      //LOGIN ===================================================
  //=============================================================
  // route for loggin form
  app.get('/login', function(req, res) {
    res.render('login.ejs', { message : req.flash('loginMessage') }); //render the page and pass in any flash data  if it exists
  });

  // process the signUP forms
  //app.post('/signup', do all our passport stuff here);

  // ==========================================================
    // LOGOUT ===============================================
// ==========================================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
}

// route middleware to make sure a user is logged in
  function isLoggedIn(req, res , next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the home PAGE
  res.redirect('/');
}
