var mongoose = require('mongoose');

var User = new mongoose.Schema({
  FirstName : String,
  LastName : String,
  Email : String,
  Password : String
});
mongoose.model("User", User);
