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
  languages: [{
    origin: {
      type: String,
      required: true
    },
    target: {
      type: String,
      required: true
    },
    stages: [{
      levels: [{
        words: Array
      }]
    }]
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = UserSchema;
