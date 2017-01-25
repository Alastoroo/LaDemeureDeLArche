
var livreController = require('../controllers/livreController');
var mongoose = require('mongoose');
var html2jade = require('html2jade');
var HomeDescription = mongoose.model("homeDescription");
var HomePres2 = mongoose.model("homePres2");
var HomeImage = mongoose.model("homeImage");

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/admin/connexion');
}

module.exports = function (app, passport){
  app.get('/', function(req,res){
    HomeDescription.find().exec(function(err,homeDescription){
      if(err){
        console.log(err);
      } else {
        res.render("index", {description : homeDescription[homeDescription.length-1].presentation});
      }
    });
  });
  app.get('/home', function(req, res){
    HomeDescription.find().exec(function(err,homeDescription){
      if(err){
        console.log(err);
      } else {
        res.render("home", {description : homeDescription[homeDescription.length-1].presentation});
      }
    });
  });
  app.get('/demeure',function(req,res){
    res.render("demeure");
  });
  app.get('/sejours',function(req,res){
    res.render("sejours");
  });
  app.get('/tourisme',function(req,res){
    res.render("tourisme");
  });
  app.get('/livre',function(req,res){
    res.render("livre");
  });
  app.get('/contact', function(req,res){
    res.render("contact");
  });
  app.get('/reservation',function(req,res){
    res.render("reservation");
  });
  app.get('/admin/connexion',function(req,res){
    res.render("admin/connexion");
  });
  app.get('/admin',isAuthenticated, function(req, res){
    res.render("admin/administrateur");
  });
  app.get('/admin/logout',isAuthenticated,function(req,res){
    req.logout();
    res.redirect('/admin');
  });
  app.get("/admin/home", isAuthenticated,function(req,res){
    HomeDescription.find().exec(function(err,homeDescription){
      if(err){
        console.log(err);
      } else {
        console.log(homeDescription[homeDescription.length-1].presentation);
        res.render("admin/home", {description : homeDescription[homeDescription.length-1].presentation});
      }
    });
  });
  app.get("/admin/home/add/image", isAuthenticated,function(req,res){
    res.render("admin/addImageHome");
  });
  app.post("/admin/home/add/image", isAuthenticated,function(req,res){

  });
  app.get("/admin/home/add/pres",isAuthenticated,function(req,res){
    res.render("admin/addPresHome");
  });
  app.post("/admin/home/add/pres",isAuthenticated,function(req,res){
      console.log(req.body.content);
      HomeDescription.create({
        presentation : req.body.content
      }, function(err, homeDescription){
        if(err){
          console.log(err);
          res.render('admin/addPresHome');
        } else {
          console.log(homeDescription);
          res.render('admin/home');
        }
      });
  });
  app.post('/admin/connexion', passport.authenticate('local-login', {
    successRedirect : '/admin',
    failureRedirect : '/admin/connexion',
    failureFlash : true
  }));

}
