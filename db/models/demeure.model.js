var mongoose = require('mongoose');


var demeureDescriptionSchema = new mongoose.Schema({
  presentation : String
});
var demeureImageSchema = new mongoose.Schema({
  url : String
});


mongoose.model("DemeureDescription", demeureDescriptionSchema, "demeureDescription");
mongoose.model("DemeureImage", demeureImageSchema, "demeureImage");
