

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/admin/connexion');
}

module.exports = function (app, passport){
  app.get('/', function(req,res){
    res.render("index");
  });
  app.get('/home', function(req, res){
    res.render("home");
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
    res.render("admin/home");
  });
  app.get("/admin/home/add/image", isAuthenticated,function(req,res){
    res.render("admin/addImageHome");
  });
  app.post('/admin/connexion', passport.authenticate('local-login', {
    successRedirect : '/admin',
    failureRedirect : '/admin/connexion',
    failureFlash : true
  }));

}
