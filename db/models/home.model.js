var mongoose = require('mongoose');

var homePres2Schema = new mongoose.Schema({
  select : Number,
  title : String,
  description : String
});

var homeDescriptionSchema = new mongoose.Schema({
  presentation : String
});
var homeImageSchema = new mongoose.Schema({
  url : String
});


mongoose.model("homeDescription", homeDescriptionSchema, "homeDescription");
mongoose.model("homePres2", homePres2Schema, "homePres");
mongoose.model("homeImage", homeImageSchema, "homeImage");
