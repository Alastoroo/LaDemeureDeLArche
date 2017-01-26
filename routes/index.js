
var livreController = require('../controllers/livreController');
var mongoose = require('mongoose');
var html2jade = require('html2jade');
var fs = require('fs');
var HomeDescription = mongoose.model("homeDescription");
var HomePres2 = mongoose.model("homePres2");
var HomeImage = mongoose.model("homeImage");
var Chambre = mongoose.model("Chambre");
var DemeureDescription = mongoose.model("DemeureDescription");
var DemeureImage = mongoose.model("DemeureImage");
var DemeureEquipement = mongoose.model("DemeureEquipement");
var Alentours = mongoose.model("Alentours");

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
        HomeImage.find().exec(function(err,homeImage){
          if(err){
            console.log(err);
          } else {
            HomePres2.find().exec(function(err,homePres2){
              if(err){
                console.log(err);
              } else {
                var description = {presentation : homeDescription.length !== 0 ? homeDescription[homeDescription.length-1].presentation : null};
                var images = {urls : homeImage.length !== 0 ? homeImage : []};
                var pres2  = {pres2 : homePres2.length !== 0 ? homePres2: []};
                res.render("index", {description : description, images : images, presentations1 : pres2.pres2[0],presentations2 : pres2.pres2[1],presentations3 : pres2.pres2[2],presentations4 : pres2.pres2[3]});
              }
            })
          }
        });
      }
    });
  });
  app.get('/demeure',function(req,res){
    res.render("demeure");
  });
  app.get('/sejours',function(req,res){
    Chambre.find().exec(function(err,chambres){
      if(err){
        console.log(err);
      } else {
        console.log(chambres[0].tarifs);
        res.render("sejours", {chambres : chambres});
      }
    })
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

  /*Admin*/
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
  /* CHAMBRE */
  app.get("/admin/chambre", isAuthenticated,function(req,res){
    Chambre.find().exec(function(err,chambres){
      if(err){
        console.log(err);
      } else {
        res.render("admin/chambres", {chambres : chambres});
      }
    });
  });
  app.get("/admin/chambre/add", isAuthenticated,function(req,res){
    res.render("admin/addChambre");
  });
  app.post("/admin/chambre/:chambreId/add/tarif", isAuthenticated,function(req,res){
    var chambreId = req.params.chambreId;
    Chambre.findOne({_id : chambreId}).exec(function(err, chambre){
      if(err){
        console.log(err);
      } else {
        tarif = {
          nbPersonne : req.body.sel1,
          description : req.body.description,
          prix : req.body.tarif,
          descriptionPrix : req.body.destarif
        }
        chambre.title = chambre.title;
        chambre.description = chambre.description;
        chambre.equipement = chambre.equipement;
        chambre.images = chambre.images;
        chambre.tarifs.push(tarif);
        chambre.save(function(err,chambreUpdated){
          if(err){
            console.log(err);
          } else {
            res.redirect('/admin/chambre');
          }
        });
      }
    });
  });
  app.get("/admin/chambre/:chambreId/add/tarif", isAuthenticated,function(req,res){
    var chambreId = req.params.chambreId;
    Chambre.findOne({_id : chambreId}).exec(function(err, chambre){
      if(err){
        console.log(err);
      } else {
        res.render("admin/addTarif", {chambre: chambre});
      }
    });
  });
  app.get("/admin/chambre/update/:chambreId", isAuthenticated,function(req,res){
    var chambreId = req.params.chambreId;
    Chambre.findOne({_id:chambreId}).exec(function(err,chambre){
      if(err){
        console.log(err);
      } else {
        console.log(chambre);
        res.render('admin/editChambre',{chambre: chambre});
      }
    })
  });
  app.post("/admin/chambre/update/:chambreId", isAuthenticated,function(req,res){
    var chambreId = req.params.chambreId;
    Chambre.findOne({_id:chambreId}).exec(function(err,chambre){
      if(err){
        console.log(err);
      } else {
        console.log(chambre);
        chambre.theme = req.body.sel1;
        chambre.title = req.body.title;
        chambre.description = req.body.description;
        chambre.equipement = req.body.equipements;
        chambre.save(function(err,chambreUpdated){
          if(err){
            console.log(err);
          } else {
            res.redirect('/admin/chambre');
          }
        });

      }
    })
  });
  app.get("/admin/chambre/delete/:chambreId", isAuthenticated,function(req,res){
    var chambreId = req.params.chambreId;
    Chambre.findOneAndRemove({_id:chambreId}).exec(function(err,chambre){
      if(err){
        console.log(err);
      } else {
        console.log(chambre);
        res.redirect('/admin/chambre');
      }
    })
  });
  app.post("/admin/chambre/add", isAuthenticated,function(req,res){
    console.log("toto");
    var images = [];
    if (!req.files) {
      res.send('No files were uploaded.');
      return;
    }
    if(req.files.images1){
      if(req.files.images2){
        if(req.files.images3){
           if(req.files.images4){
             images.push("img/chambres/"+req.body.sel1+"/"+req.files.images1.name);
             images.push("img/chambres/"+req.body.sel1+"/"+req.files.images2.name);
             images.push("img/chambres/"+req.body.sel1+"/"+req.files.images3.name);
             images.push("img/chambres/"+req.body.sel1+"/"+req.files.images4.name);
           } else {
             images.push("img/chambres/"+req.body.sel1+"/"+req.files.images1.name);
             images.push("img/chambres/"+req.body.sel1+"/"+req.files.images2.name);
             images.push("img/chambres/"+req.body.sel1+"/"+req.files.images3.name);
           }
        } else {
          images.push("img/chambres/"+req.body.sel1+"/"+req.files.images1.name);
          images.push("img/chambres/"+req.body.sel1+"/"+req.files.images2.name);
        }
      } else {
        images.push("img/chambres/"+req.body.sel1+"/"+req.files.images1.name);
      }
    }
    console.log(images);
    var image1 = req.files.images1;
    var image2 = req.files.images2 ? req.files.images2 : null;
    var image3 = req.files.images3 ? req.files.images3 : null;
    var image4 = req.files.images4 ? req.files.images4 : null;

    Chambre.create({
      theme : req.body.sel1,
      title : req.body.title,
      description : req.body.description,
      equipement : req.body.equipements,
      images : images
    }, function(err, chambre){
      if(err){
        console.log(err);
      } else {
        image1.mv(process.env.PWD+'/public/img/chambres/'+req.body.sel1+'/'+image1.name,function(err){
          if(image2 !== null){
            image2.mv(process.env.PWD+'/public/img/chambres/'+req.body.sel1+'/'+image2.name, function(err){
              if(image3 !== null){
                image3.mv(process.env.PWD+'/public/img/chambres/'+req.body.sel1+'/'+image3.name, function(err){
                  if(image4 !== null){
                    image4.mv(process.env.PWD+'/public/img/chambres/'+req.body.sel1+'/'+image4.name, function(err){
                      res.redirect("/admin/chambre");
                    });
                  } else {
                    res.redirect("/admin/chambre");
                  }
                });
              } else {
                res.redirect("/admin/chambre");
              }
            });
          } else {
            res.redirect("/admin/chambre");
          }
        });
      }
    });
  });
  /*FIN CHAMBRE */

  /*DEBUT HOME*/
  app.get("/admin/home", isAuthenticated,function(req,res){
    HomeDescription.find().exec(function(err,homeDescription){
      if(err){
        console.log(err);
      } else {
        HomeImage.find().exec(function(err,homeImage){
          if(err){
            console.log(err);
          } else {
            HomePres2.find().exec(function(err,homePres2){
              if(err){
                console.log(err);
              } else {
                var description = {presentation : homeDescription.length !== 0 ? homeDescription[homeDescription.length-1].presentation : null};
                var images = {urls : homeImage.length !== 0 ? homeImage : []};
                var pres2  = {pres2 : homePres2.length !== 0 ? homePres2: []};
                res.render("admin/home", {description : description, images : images, presentations : pres2});
              }
            })
          }
        });
      }
    });
  });
  app.get("/admin/home/add/image", isAuthenticated,function(req,res){
    res.render("admin/addImageHome");
  });
  app.get("/admin/home/image/delete/:imageId",isAuthenticated,function(req,res){
    var imageId = req.params.imageId;
    HomeImage.findOneAndRemove({_id:imageId}).exec(function(err,image){
      if(err){
        console.log(err);
      } else {
        console.log(image);
        fs.unlink(process.env.PWD+'/public/'+image.url);
        res.redirect('/admin/home');
      }
    });
  });
  app.post("/admin/home/add/image", isAuthenticated,function(req,res){
    var sampleFile;
    if (!req.files) {
      res.send('No files were uploaded.');
      return;
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    HomeImage.create({url : 'img/carousel/'+sampleFile.name}, function(err,image){
      if(err){
        console.log(err);
      } else {
        sampleFile.mv(process.env.PWD+'/public/img/carousel/'+sampleFile.name, function(err) {
          if (err) {
            console.log(err);
            res.redirect('/admin/home/add/image');
          }
          else {
            res.redirect('/admin/home');
          }
        });
      }
    });
  });
//-----------------------------------------------------------------------------------------------
  app.get("/admin/home/add/pres2",isAuthenticated,function(req,res){
    res.render("admin/addPres2Home");
  });
  app.get("/admin/home/update/pres2/:pres2Id",isAuthenticated,function(req,res){
    var pres2Id = req.params.pres2Id;
    HomePres2.findOne({_id:pres2}).exec(function(err,pres2){
      if(err){
        console.log(err);
      } else {
        res.render("admin/updatePres2Home",{pres2 : pres2});
      }
    });
  });
  app.post("/admin/home/update/pres2/:pres2Id",isAuthenticated,function(req,res){
    var pres2Id = req.params.pres2Id;
    HomePres2.findOne({_id:pres2Id}).exec(function(err,pres2){
      if(err){
        console.log(err);
      } else if(!pres2) {
        res.render("admin/updatePres2Home",{pres2 : pres2});
      }
      pres2.title = req.body.title;
      pres2.select = req.body.sel1;
      pres2.description = req.body.description;
      pres.save().exec(function(err,pres2Updated){
        if(err){
          console.log(err);
        } else {
          res.redirect('/admin/home');
        }
      })
    });
  });
  app.get("/admin/home/delete/pres2/:pres2Id",isAuthenticated,function(req,res){
    var pres2Id = req.params.pres2Id;
    HomePres2.findOneAndRemove({_id:pres2Id}).exec(function(err,pres2){
      if(err){
        console.log(err);
      } else {
        res.redirect("/admin/home");
      }
    });
  });
  app.post("/admin/home/add/pres2",isAuthenticated,function(req,res){
    HomePres2.create({
      select : parseInt(req.body.sel1),
      title : req.body.title,
      description : req.body.content
    }, function(err, homePres){
      if(err){
        console.log(err);
        res.redirect("/admin/addPres2Home");
      } else {
        console.log(homePres);
        res.redirect('/admin/home');
      }
    });
  });
//---------------------------------------------------------------------------------------------------
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
          res.redirect('/admin/home');
        }
      });
  });
  app.post('/admin/connexion', passport.authenticate('local-login', {
    successRedirect : '/admin',
    failureRedirect : '/admin/connexion',
    failureFlash : true
  }));
  /*FIN HOME*/

  /*DEBUT ALENTOURS*/
  app.get("/admin/alentours", isAuthenticated, function(req,res){
    Alentours.find().exec(function(err,alentours){
      if(err){
        console.log(err);
      } else {
        var alentours = alentours.length !== 0 ? alentours : [];
        res.render("admin/alentours", {alentours : alentours});
      }
    });
  });
  app.get("/admin/alentours/add", isAuthenticated, function(req,res){
    res.render("admin/addAlentours")
  });
  app.get("/admin/alentours/delete/:alentoursId", isAuthenticated, function(req,res){
    var alentoursId = req.params.alentoursId;
    Alentours.findOneAndRemove({_id:alentoursId}).exec(function(err,alentours){
      if(err){
        console.log(err);
      } else {
        console.log(alentours);
        fs.unlink(process.env.PWD+'/public/'+alentours.urlImage);
        res.redirect('/admin/alentours');
      }
    });
    res.redirect("/admin/alentours")
  });
  app.post("/admin/alentours/add", isAuthenticated, function(req,res){
    var sampleFile;
    if (!req.files) {
      res.send('No files were uploaded.');
      return;
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    Alentours.create({
      title : req.body.title,
      description : req.body.content,
      urlImage : 'img/alentours/'+sampleFile.name
    }, function(err,alentour){
      if(err){
        console.log(err);
      } else {
        sampleFile.mv(process.env.PWD+'/public/img/alentours/'+sampleFile.name, function(err) {
          if (err) {
            console.log(err);
            res.redirect('/admin/alentours/add');
          }
          else {
            res.redirect('/admin/alentours');
          }
        });
      }
    });
  });

  /*FIN ALENTOURS*/
  /*DEBUT DEMEURE*/
  app.get('/admin/demeure',isAuthenticated,function(req,res){
    DemeureDescription.find().exec(function(err,demeureDescription){
      if(err){
        console.log(err);
      } else {
        DemeureImage.find().exec(function(err,demeureImage){
          if(err){
            console.log(err);
          } else{
            DemeureEquipement.find().exec(function(err,demeureEquipement){
              if(err){
                console.log(err);
              } else {
                var description = {presentation : demeureDescription.length !== 0 ? demeureDescription[demeureDescription.length-1].presentation : null};
                var images = {urls : demeureImage.length !== 0 ? demeureImage : []};
                var equipements = {equip : demeureEquipement !== 0 ? demeureEquipement : []}
                res.render('admin/demeure', {description : description, images : images, equipements : equipements});
              }
            });
          }
        });
      }
    });
  });
  app.get('/admin/demeure/add/description',isAuthenticated,function(req,res){
    res.render('admin/addDemeureDescription');
  });
  app.post('/admin/demeure/add/description',isAuthenticated,function(req,res){
    DemeureDescription.create({
      presentation  : req.body.content
    },function(err,DemeureDescription){
      if(err){
        console.log(err);
      } else {
        res.redirect('/admin/demeure');
      }
    });
  });
  app.get("/admin/demeure/add/image", isAuthenticated,function(req,res){
    res.render("admin/addImageDemeure");
  });
  app.get("/admin/demeure/add/equipement", isAuthenticated,function(req,res){
    res.render("admin/addEquipementDemeure");
  });
  app.post("/admin/demeure/add/equipement", isAuthenticated,function(req,res){
    var sampleFile;
    if (!req.files) {
      res.send('No files were uploaded.');
      return;
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    DemeureEquipement.create({title : req.body.title, description: req.body.content ,urlImage : 'img/demeureApropos/'+sampleFile.name}, function(err,image){
      if(err){
        console.log(err);
      } else {
        sampleFile.mv(process.env.PWD+'/public/img/demeureApropos/'+sampleFile.name, function(err) {
          if (err) {
            console.log(err);
            res.redirect('/admin/demeure/add/image');
          }
          else {
            res.redirect('/admin/demeure');
          }
        });
      }
    });
  });
  app.get("/admin/demeure/image/delete/:imageId",isAuthenticated,function(req,res){
    var imageId = req.params.imageId;
    DemeureImage.findOneAndRemove({_id:imageId}).exec(function(err,image){
      if(err){
        console.log(err);
      } else {
        console.log(image);
        fs.unlink(process.env.PWD+'/public/'+image.url);
        res.redirect('/admin/demeure');
      }
    })
  });
  app.post("/admin/demeure/add/image", isAuthenticated,function(req,res){
    var sampleFile;
    if (!req.files) {
      res.send('No files were uploaded.');
      return;
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    DemeureImage.create({url : 'img/demeureApropos/'+sampleFile.name}, function(err,image){
      if(err){
        console.log(err);
      } else {
        sampleFile.mv(process.env.PWD+'/public/img/demeureApropos/'+sampleFile.name, function(err) {
          if (err) {
            console.log(err);
            res.redirect('/admin/demeure/add/image');
          }
          else {
            res.redirect('/admin/demeure');
          }
        });
      }
    });
  });
  /*FIN DEMEURE*/
}
