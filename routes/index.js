var express = require("express");
var router = express.Router();
var path = require('path');
var jade = require('jade');

     router
       .route("/")
       .get(function(req,res){
         res.render("index");
       });

       router
             .route('/users') // on declare la route
             .get(function(req,res){ //on va recuperer les users
               User
                   .find() // on va aller chercher tout les utilisateur dans notre base donné
                   .exec(function(err, users){
                     if(err) {
                       res.status(500);
                       res.render("error", err);// on defini la page que l'on veut afficher
                     } else {
                       res.render("users-list", {users: users}); // prend la donné users pour l'afficher
                     }
                   });
             });



module.exports = router;
