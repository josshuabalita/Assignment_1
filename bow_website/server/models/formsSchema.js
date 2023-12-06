const mongoose = require('mongoose');

const studentFormSchema = new mongoose.Schema({
  userID: Number,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  dob: String,
  department: String,
  program: String,
  question: String,
});


const StudentForm = mongoose.model('StudentForm', studentFormSchema);

module.exports = StudentForm;