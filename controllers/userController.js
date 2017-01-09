var mongoose = require('mongoose');

var User     = mongoose.model('User');
var bcrypt   = require('bcrypt-nodejs');
//var jwt      = require('jsonwebtoken');

module.exports.register = function(req, res) { console.log("##REGISTER##");
  console.log('registering user');

  var username = req.body.username;
  var name     = req.body.name || null;
  var password = req.body.password;
  var email = req.body.email;
  //var country = req.body.country;

  User.create({
    username : username,
    name     : name,
    email: email,
    //country: country,
    password : bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }, function(err, user) {
    if(err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      console.log('user created', user);
      res.status(201).json(user);
    }
  });
};
