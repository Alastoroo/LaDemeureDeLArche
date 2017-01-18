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

// // INSCRIPTION DEBUT
//   User
//     .create({
//     LastName : lastName,
//     FirstName : firstName,
//     Email: email,
//     //country: country,
//     Password : bcrypt.hashSync(password, bcrypt.genSaltSync(10))
//   }, function(err, user) {
//     if(err) {
//       console.log(err);
//       res.status(500).render('inscription', {error : 'Email deja utilisé, veuillez en choisir une autre !'});
//     } else {
//       console.log('user created', user);
//       res.status(201).render('reservation');
//     }
//   });
// };
// // CONNEXION DEBUT
//   module.exports.login = function(req, res){
//     passport.use(new LocalStrategy(
//       function(req.body.email, req.body.password, done ){
//         User
//         .find({email: req.body.email})
//         .exec(function(err , user){
//           if(err){
//             done(err);
//           }else if(req.body.password != user.password){
//             done(null, false);
//           } else {
//             done(null, user);
//           }
//         })
//       }
//     ))
//   }
// // MODULE FIN

module.export = function(app, passport){

            app.get('/connexion', function(req, res) {
              // render the page and pass in any flash data if it exists
              res.render('connexion.jade', { message: req.flash('loginMessage') });
            });

            app.get('/inscription', function(req, res) {
              // render the page and pass in any flash data if it exists
              res.render('inscription', { message: req.flash('signupMessage') });
            });

            app.get('/home', isLoggedIn, function(req, res) {
              res.render('home', {
                user : req.user // get the user out of session and pass to template
              });
    });
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
},

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
