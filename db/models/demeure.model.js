var mongoose = require('mongoose');


var demeureDescriptionSchema = new mongoose.Schema({
  presentation : String
});
var demeureImageSchema = new mongoose.Schema({
  url : String
});

var demeureEquipementSchema = new mongoose.Schema({
  title : String,
  description : String,
  urlImage : String
});

var DemeureSlidImage = new mongoose.Schema({
  url : String
});

mongoose.model("DemeureEquipement", demeureEquipementSchema,'demeureEquipement');
mongoose.model("DemeureDescription", demeureDescriptionSchema, "demeureDescription");
mongoose.model("DemeureImage", demeureImageSchema, "demeureImage");
mongoose.model("DemeureSlidImage", DemeureSlidImage, "DemeureSlidImage")
