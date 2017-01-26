var mongoose = require("mongoose");


var tarifSchema = new mongoose.Schema({
  nbPersonne : Number,
  description : String,
  prix : Number,
  descriptionPrix : String
});

var chambreSchema = new mongoose.Schema({
  theme : String,
  title : String,
  description : String,
  equipement : String,
  images : [String],
  tarifs : [tarifSchema]
});

mongoose.model("Chambre", chambreSchema, "chambres");
