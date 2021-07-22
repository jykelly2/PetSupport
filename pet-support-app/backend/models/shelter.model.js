//import const mongoose = require('mongoose');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shelterSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 3
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    minlength: 10
  },
  streetAddress: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  city: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  province: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  postalCode: {
    type: String,
    required: true,
    trim: true,
    minlength: 6
  },
  pictures: {
    type: Array,
    required: false,
    trim: true,
  },
  available: {
    type: Boolean,
    required: true
  },
}, {
  timestamps: true,
});

const Shelter = mongoose.model('Shelter', shelterSchema);

module.exports = Shelter;