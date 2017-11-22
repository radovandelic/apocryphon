var db = require('../../config/database');
var mongoose = require('mongoose');
var schema = require('./user');

db.startDB();
var User = mongoose.model('User', schema);

module.exports = User;
