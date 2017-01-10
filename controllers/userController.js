var mongoose = require('mongoose');

var User     = mongoose.model('User');
var bcrypt   = require('bcrypt-nodejs');
//var jwt      = require('jsonwebtoken');

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
  User.create({
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
