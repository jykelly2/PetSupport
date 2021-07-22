const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const masterUserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: false,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  shelters: {
    type: Array,
    required: false,
    trim: true,
  },
  picture: {
    type: String,
    required: false,
    trim: true,
  },
}, {
  timestamps: true,
});

const MasterUser = mongoose.model('MasterUser', masterUserSchema);

module.exports = MasterUser;