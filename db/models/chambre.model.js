var mongoose = require("mongoose");


var tarifSchema = new mongoose.Schema({
  nbPersonne : Number,
  Descritpion : String,
  Prix : Number,
  DescriptionPrix : String
});

var chambreSchema = new mongoose.Schema({
  title : String,
  description : String,
  equipement : String,
  images : [String],
  tarifs : [tarifSchema]
});

mongoose.model("Chambre", chambreSchema, "chambres");
