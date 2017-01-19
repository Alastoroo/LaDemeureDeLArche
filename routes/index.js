module.exports = function (app, passport){
  app.get('/', function(req,res){
    res.render("index");
  });
  app.get('/demeure',function(req,res){
    res.render("demeure");
  });
  app.get('/sejours',function(req,res){
    res.render("demeure");
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
    res.render("contact");
  });
  app.get('/admin/connexion', function(req,res){
    res.render("admin/connexion");
  });
  app.get('/admin', function(req, res){
    res.render("admin/administrateur");
  });
  app.post('/admin/connexion', passport.authenticate('local-login', {
    successRedirect : '/admin',
    failureRedirect : '/admin/connexion',
    failureFlash : true
  }));

}
// // Partis Vue utilisateur
//      router
//        .route("/")
//        .get(function(req,res){
//          res.render("index");
//        });
//
//        router
//          .route("/demeure")
//          .get(function(req,res){
//            res.render("demeure");
//          });
//
//        router
//          .route("/sejours")
//          .get(function(req,res){
//            res.render("sejours");
//          });
//
//        router
//            .route("/tourisme")
//            .get(function(req,res){
//              res.render("tourisme");
//            });
//            router
//              .route("/livre")
//              .get(function(req,res){
//                res.render("livre");
//              });
//             router
//                .route("/contact")
//                .get(function(req,res){
//                  res.render("contact");
//                });
//                router
//                   .route("/reservation")
//                   .get(function(req,res){
//                     res.render("reservation");
//                   });
//
// //PARTIE ADMIN DEBUT
//               router
//                .route("/admin/connexion")
//                .get(function(req,res){
//                  res.render("connexion");
//                })



              //  router
              //    .route("/inscription")
              //    .get(function(req, res){
              //      res.render("inscription", { message: req.flash('signupMessage') });
              //    });

                //  router
                //   .route("/admin/chambres")
                //   .get(function(req, res){
                //     res.render("admin/chambres");
                //   });

// PARTIE ADMIN FIN
