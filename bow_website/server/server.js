const express = require('express');
const app = express();
const path = require('path')
const cors = require('cors');


//import mongodb connection file
const db = require('./db.js');


//Server Connections and message
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());

app.get('/', (req,res) => {
    res.send('Connected to server and good for running!')
})

app.listen(PORT, () => {
    console.log('Server connected on PORT 8080')
})


//Populate Database with Courses Data JSON and just GET afterwards
const coursesSchema = require('./models/coursesSchema.js');
const coursesData = require('./coursesData.json'); 

app.get('/courses', async (req, res) => {
    try {
      const mongoCourses = await coursesSchema.find(); 
  
      if (!mongoCourses) {
        return res.status(404).json({ message: 'No courses found' });
      }
  
      res.json(mongoCourses);
    } catch (error) {
      console.error('Error retrieving courses data:', error);
      res.status(500).send('Error retrieving courses data');
    }
});


//Add a new course to Database 
app.post('/add-new-course', async (req, res) => {
    try {
      const {
        courseName,
        courseCode,
        selectedTerm,
        startMonthDay,
        endMonthDay,
        tuitionFee,
      } = req.body;
  
      if (!courseName || !courseCode || !selectedTerm || !startMonthDay || !endMonthDay || !tuitionFee) {
        return res.status(400).json({ message: 'Please fill in all required fields' });
      }
  
      const formattedTuitionFee = tuitionFee.startsWith('$') ? tuitionFee : `$${tuitionFee}`;
  
      const newCourse = {
        courseName,
        courseCode,
        startDate: startMonthDay,
        endDate: endMonthDay,
        tuitionFee: formattedTuitionFee,
      };
  
      const term = await coursesSchema.findOne({ term: selectedTerm });
  
      if (!term) {
        return res.status(404).json({ message: 'Term not found' });
      }
  
      term.courses.push(newCourse);
      await term.save();
  
      res.status(201).json({ message: 'Course added successfully', course: newCourse });
    } catch (error) {
      console.error('Error adding course:', error);
      res.status(500).json({ message: 'Error adding course', error: error.message });
    }
});


//Delete Courses from Database/JSON 
app.delete('/courses/:courseCode', async (req, res) => {
  const courseCodeToDelete = req.params.courseCode;

  try {
    const termContainingCourse = await coursesSchema.findOne({ 'courses.courseCode': courseCodeToDelete });

    if (!termContainingCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const courseIndex = termContainingCourse.courses.findIndex(course => course.courseCode === courseCodeToDelete);

    if (courseIndex === -1) {
      return res.status(404).json({ message: 'Course not found within the term' });
    }

    termContainingCourse.courses.splice(courseIndex, 1);

    await termContainingCourse.save();

    return res.json({ message: `Course ${courseCodeToDelete} deleted successfully` });
  } catch (error) {
    console.error('Error deleting course:', error);
    return res.status(500).json({ message: 'Error deleting course', error: error.message });
  }
});






