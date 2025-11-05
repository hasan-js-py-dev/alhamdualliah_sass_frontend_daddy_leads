const mongoose = require('mongoose');

const cookieSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  cookie: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Cookie', cookieSchema);
