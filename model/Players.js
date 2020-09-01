const mongoose = require('mongoose');
const { number } = require('@hapi/joi');
const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
    max: 100
  },
  email: {
    type: String,
    required: true,
    min: 6
  },
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 2,
  },
  city: {
    type: String,
    required: true,
    min: 3,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Player', playerSchema);