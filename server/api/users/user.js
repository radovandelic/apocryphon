const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: false
  },

  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: false
  },
  proficiency: {
    type: Number,
    required: false
  },
  languages: {
    type: Array,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = UserSchema;
