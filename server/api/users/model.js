var db = require('../config/database');
var mongoose = require('mongoose');
var schema = require('./schema');

db.startDB();
var User = mongoose.model('User', schema);

module.exports = User;
