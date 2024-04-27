const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema({
  wallet_address: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Organizer = mongoose.model('Organizer', organizerSchema);

module.exports = Organizer;
