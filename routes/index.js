var passport = require('passport');
var express = require("express");
var router = express.Router();
var path = require('path');
var jade = require('jade');

var ctrlUser = require('../controllers/userController.js');

//ROUTE PERMET D'AFFICHER LE CONTENUE
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
            .post(ctrlUser.login)
            .get(function(req, res){
                res.render("connexion");
            });







module.exports = router;
