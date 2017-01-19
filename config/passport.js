//Config/passport.js

//Charge ce dont on a besoin
var LocalStrategy = require('passport-local').Strategy;

//load up the user model
var User = require('../db/models/users.model.js');
//load the auth variable
//var configAuth = require('./auth');
// expose this function to our db using module.exports
module.exports = function(passport) {
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  //LOCAL CONNEXION
  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },

  function(req, email, password, done) {
    console.log('email', email);
    User.findOne({ 'local.email' : email }, function(err,user){
      console.log('user', user);console.log('error', err);
      if (err)
        return done(err);
      if (!user)
        return done(null, false, req.flash('loginMessage', 'No user found'));
      if (!user.validPassword(password))
        return done(null,false, req.flash('loginMessage', 'Oops! wrong email or password'));
      return done(null, user);
    });
  }
));
}
