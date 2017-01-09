var mongoose = require('mongoose');

var User = new mongoose.Schema({
  FirstName : String,
  LastName : String,
  Adress : String,
  Email : String
});
mongoose.model("User", User);
