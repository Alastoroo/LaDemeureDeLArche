var express = require("express");
var router = express.Router();
var path = require('path');
var jade = require('jade');

var ctrlUser = require('../controllers/userController.js');


     router
       .route("/")
       .get(function(req,res){
         res.render("index");
       });

       router
         .route("/sejours")
         .get(function(req,res){
           res.render("sejours");
         });

         router
           .route("/demeure")
           .get(function(req,res){
             res.render("demeure");
           });

           router
            .route("/livre")
            .get(function(req,res){
              res.render("livre");
            });

            router
            .route("/contact")
            .get(function(req,res){
               res.render("contact");
            });

            router
            .route("/reservation")
            .get(function(req,res){
               res.render("reservation");
            });

            router
            .route("/tourisme")
            .get(function(req,res){
               res.render("tourisme");
            });

            router
            .route("/inscription")
            .post(ctrlUser.register)
            .get(function(req, res){
                res.render("inscription");
            });

            router
            .route("/connexion")
            .get(function(req, res){
                res.render("connexion");
            });

      //  router
      //        .route('/users') // on declare la route
       //
      //        .get(function(req,res){ //on va recuperer les users
      //          User
      //              .find() // on va aller chercher tout les utilisateur dans notre base donné
      //              .exec(function(err, users){
      //                if(err) {
      //                  res.status(500);
      //                  res.render("error", err);// on defini la page que l'on veut afficher
      //                } else {
      //                  res.render("users-list", {users: users}); // prend la donné users pour l'afficher
      //                }
      //              });
      //        });

// CONEXION
      // router
      // .route("/connexion")
      // app.post('/connexion',
      // passport.authenticate('local', { successRedirect: '/reservation', successFlash: 'Bienvenue!', failureRedirect: '/connexion', failureFlash: 'Email ou mot de passe invalide, veuillez reesayer'}),
      // function(req, res) {
      //   // If this function gets called, authentication was successful.
      //   // `req.user` contains the authenticated user.
      //   res.redirect('/users/' + req.user.username); // ??????? METRE req.body.lastName ??????????
      // });

module.exports = router;
