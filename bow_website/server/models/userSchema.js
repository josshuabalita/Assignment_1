const Mongoose = require('mongoose');

const addedCoursesSchema = new Mongoose.Schema({
  courseName: String,
  courseCode: String,
  startDate: String, 
  endDate: String, 
  tuitionFee: String,
  term: String, 
});

const term = new Mongoose.Schema({
  term: String, 
  courses: [addedCoursesSchema]
})

const UserSchema = new Mongoose.Schema({
    userID: {
        type: Number,
        unique: true,
        required: true,
        min: 10000,
        max: 99999,
        default: () => Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000
      },
    firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      phoneNumber: {
        type: String,
        required: true,
        match: [/^\d{3}-\d{3}-\d{4}$/, 'Please enter a phone number in the format 123-456-7890']
      },
      dateOfBirth: {
        type: Date,
        required: true
      },
      department: {
        type: String,
        required: true
      },
      program: {
        type: String,
        required: true
      },
      role: {
        type: String,
      },
      username: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      registrationTimestamp: {
        type: Date,
        default: Date.now
      },
      registeredCourses: [term]
});

const User = Mongoose.model("user", UserSchema);
module.exports = User;