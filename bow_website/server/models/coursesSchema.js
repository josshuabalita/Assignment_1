const mongoose = require('mongoose');

// Define the course schema
const courseSchema = new mongoose.Schema({
  courseName: String,
  courseCode: String,
  startDate: String,
  endDate: String,
  tuitionFee: String,
});

// Define the term schema
const termSchema = new mongoose.Schema({
  term: String,
  courses: [courseSchema],
});

// Create models based on the schemas
const Term = mongoose.model('Term', termSchema);

module.exports = Term;