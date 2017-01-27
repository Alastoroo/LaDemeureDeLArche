var mongoose = require("mongoose");


var alentourSchema = new mongoose.Schema({
  title : String,
  description : String,
  urlImage : String,
  url : String,
});

mongoose.model("Alentours", alentourSchema, "alentours");
