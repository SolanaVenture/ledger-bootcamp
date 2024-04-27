const mongoose = require('mongoose');
const { start } = require('repl');

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    // organizer's wallet address
    type: String,
    required: true,
  },
  owner_name: {
    // organizer's name
    type: String,
  },
  description: String,
  duration: {
    // in days
    type: Number,
    required: true,
  },
  start_date: {
    // start date of the bootcamp
    type: Date,
    required: true,
  },
  end_date: {
    // end date of the bootcamp
    type: Date,
    required: true,
  },
  students: {
    // wallet addresses of students which are enrolled in the bootcamp and paid the deposit
    type: [String],
    default: [],
  },
  deposit_amount: {
    // every student has to pay this amount (lamports) to enroll in the bootcamp
    type: Number,
    required: true,
  },
  active: {
    // if the bootcamp is still active
    type: Boolean,
    default: true,
  },
  refunded: {
    // if all students are refunded
    type: Boolean,
    default: false,
  },
});

const Bootcamp = mongoose.model('Bootcamp', BootcampSchema);

module.exports = Bootcamp;
