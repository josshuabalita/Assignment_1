const mongoose = require('mongoose');

const addedCoursesSchema = new mongoose.Schema({
    courseName: String,
    courseCode: String,
    startDate: String, 
    endDate: String, 
    tuitionFee: String,
    term: String, 
}, {
    timestamp: true
});

const term = new mongoose.Schema({
    term: String, 
    courses: [addedCoursesSchema]
})

const AddedCourses = mongoose.model('AddedCourses', term);

module.exports = AddedCourses;