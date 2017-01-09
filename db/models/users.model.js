var mongoose = require('mongoose');

var User = new mongoose.Schema({
  FirstName : String,
  LastName : String,
  Email : { type: String, index:{unique: true}},
  Password : String
});
mongoose.model("User", User, "users");
