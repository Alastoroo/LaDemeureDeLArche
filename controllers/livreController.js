var mongoose = require('mongoose');
var livre = mongoose.model("livre");

module.exports.avisPostOne = function(req, res) {
  console.log("Create one comment");
  livre
    .create({
      reservation: req.body.reservation,
      etoiles: req.body.etoiles,
      commentaire: req.body.commentaire
    },function(err, livre){

      if(err) {
        console.log(err);
      res
        .status(500)
        .json(err);
      } else {
        res
          .status(201)
          .json(livre);
      }
    });
};

module.exports.avisGetAll = function(req, res) {
  console.log("Create one comment");
  livre
    .find()
      .exec(function(err,livre){
        if(err) {
          res
            .status(500)
            .json(err);
        }else{
          res.render("livre",{livres:livre});
        }
      });
};
