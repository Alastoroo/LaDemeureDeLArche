var mongoose = require('mongoose');
var bcrypt = require('bcrypt-node');
var userSchema = new mongoose.Schema({
  local : {
    email    : String,
    password : String,
  }
});
// mongoose.model("User", User, "users");

//methods
//generating a hash
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltsync(8),null);
};
//checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// creat the model for the users and expose it to our app
module.exports = mongoose.model('User', userSchema);
