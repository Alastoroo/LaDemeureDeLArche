var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User     = mongoose.model('User');
var bcrypt   = require('bcrypt-nodejs');

//var jwt      = require('jsonwebtoken');

// MODULE
module.exports.register = function(req, res) {
  console.log("##REGISTER##");
  console.log('registering user');

  console.log(req.body);

  var lastName = req.body.lastname;
  var firstName = req.body.firstname;
  var password = req.body.password;
  var email = req.body.email;
  //var country = req.body.country;

// INSCRIPTION DEBUT
  User
    .create({
    LastName : lastName,
    FirstName : firstName,
    Email: email,
    //country: country,
    Password : bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }, function(err, user) {
    if(err) {
      console.log(err);
      res.status(500).render('inscription', {error : 'Email deja utilisé, veuillez en choisir une autre !'});
    } else {
      console.log('user created', user);
      res.status(201).render('reservation');
    }
  });
};
// CONNEXION DEBUT
  module.exports.login = function(req, res){
    passport.use(new LocalStrategy(
      function(req.body.email, req.body.password, done ){
        User
        .find({email: req.body.email})
        .exec(function(err , user){
          if(err){
            done(err);
          }else if(req.body.password != user.password){
            done(null, false);
          } else {
            done(null, user);
          }
        })
      }
    ))
  }
// MODULE FIN
