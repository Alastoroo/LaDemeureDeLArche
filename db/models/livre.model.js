var mongoose = require('mongoose');

var livreSchema = new mongoose.Schema({
  reservation : String,
  etoiles : Number,
  commentaire : String
});

mongoose.model("livre", livreSchema, "avis");
