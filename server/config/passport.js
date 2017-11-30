const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
// brings in the data base
const User = mongoose.model('./users/model');
// passport

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      console.log('This passport working', email);
    })
  );
};
