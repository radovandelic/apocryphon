var db = require('../../config/database');
var mongoose = require('mongoose');
var schema = require('./user');
var bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;

db.startDB();
var User = mongoose.model('User', schema);

// methods ======================
// generating a hash
schema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
schema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = User;
