const express = require('express');
const app = express();
const path = require('path')
const cors = require('cors');
const session = require('express-session');

//import mongodb connection file
const db = require('./db.js');

//Server Connections and message
const PORT = process.env.PORT || 8080;

app.use(session({
  secret: '@q/[y(?g3RRrnS~',
  resave: false, 
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, 
    secure: false, 
    sameSite: 'strict', 
  },
}));

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    res.send('Connected to server and good for running!')
})

app.listen(PORT, () => {
    console.log('Server connected on PORT 8080')
})
///////////////////////////////////////////////////////////////////////////////////////////////////

//Login Pages 
const User = require('./models/userSchema.js')

//Registration 
app.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    if (savedUser.role === "student") {
      redirectURL = '/';
    } else if (savedUser.role === "instructor") {
      redirectURL = '/login/instructor';
    }
    res.status(200).json({ redirectURL, message: 'Registeration Successful! Please sign in.' }); 
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


//Login student
app.post('/login/student', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'Username not registered in the system.' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid Password.' });
    }

    if (user.role !== 'student') {
      return res.status(403).json({ message: 'Account not found.' });
    }

    req.session.user = {
      _id: user.userID,
      name: user.firstName + " " + user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      dob: user.dateOfBirth,
      program: user.program,
      department: user.department,
      registeredCourses: user.registeredCourses
    }; 

    res.status(200).json({ redirectURL: '/student/addcourses'});
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

//Middleware for checking authentication
const authenticateUser = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'User not authenticated' });
  }
};

//Login instructor or admin
app.post('/login/admin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'Username not registered in the system.' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid Password.' });
    }

    if (user.role !== 'instructor') {
      return res.status(403).json({ message: 'Account not found.' });
    }

    req.session.user = {
      _id: user.userID,
      name: user.firstName + " " + user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      dob: user.dateOfBirth,
    }; 

    res.status(200).json({ redirectURL: '/instructor/viewcourses' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

//Logout to kill session
app.post('/logout', (req, res) => {
  try {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: 'Error logging out' });
      }

      res.clearCookie('connect.sid');
      res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.redirect('/');
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


///////////////////////////////////////////////////////////////////////////////////////////////////

//Populate Database with Courses Data JSON and just GET afterwards
const coursesSchema = require('./models/coursesSchema.js');
const coursesData = require('./coursesData.json'); 

app.get('/courses',async (req, res) => {
    try {
      if (req.session && req.session.user) {
        const mongoCourses = await coursesSchema.find(); 
    
        if (!mongoCourses) {
          return res.status(404).json({ message: 'No courses found' });
        }
        res.json(mongoCourses);
    } else {
      res.status(401).json({ message: 'User not authenticated' });
    }
    } catch (error) {
      console.error('Error retrieving courses data:', error);
      res.status(500).send('Error retrieving courses data');
    }
});


//Add a new course to Database 
app.post('/add-new-course', async (req, res) => {
    try {
      if (req.session && req.session.user) {
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
    } else {
      res.status(401).json({ message: 'User not authenticated' });
    }
    } catch (error) {
      console.error('Error adding course:', error);
      res.status(500).json({ message: 'Error adding course', error: error.message });
    }
});


//Delete Courses from Database/JSON 
app.delete('/courses/:courseCode', async (req, res) => {
  try {
    if (req.session && req.session.user) {
      const courseCodeToDelete = req.params.courseCode;
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
  } else {
    res.status(401).json({ message: 'User not authenticated' });
  }
  } catch (error) {
    console.error('Error deleting course:', error);
    return res.status(500).json({ message: 'Error deleting course', error: error.message });
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Student Add Courses to My Courses Page
const RegisteredCourses = require('./models/addedCourseSchema.js');

app.post('/courses/student/added-courses', async (req, res) => {
  try {
    if (req.session && req.session.user) {
      const {
        courseName,
        courseCode,
        startDate,
        endDate,
        tuitionFee,
        term,
      } = req.body;

      const userId = req.session.user._id;

      const user = await User.findOne({ userID: userId });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const program = user.program; 

      let maxCoursesAllowed = 0;
      if (program === 'Diploma') {
        maxCoursesAllowed = Infinity; 
      } else if (program === 'Post-Diploma') {
        maxCoursesAllowed = 7; 
      } else if (program === 'Certificate') {
        maxCoursesAllowed = 1; 
      }

      const totalCoursesTaken = user.registeredCourses
        .map((term) => term.courses.length)
        .reduce((total, current) => total + current, 0);

      if (totalCoursesTaken >= maxCoursesAllowed) {
        return res.status(400).json({ message: 'Course limit reached for the program' });
      }

      const existingTerm = user.registeredCourses.find((c) => c.term === term);

      if (!existingTerm) {
        user.registeredCourses.push({ term, courses: [] });
      }

      const courseExists = user.registeredCourses.some(
        (c) =>
          c.term === term &&
          c.courses.some(
            (course) => course.courseCode === courseCode
          )
      );

      if (courseExists) {
        return res.status(400).json({ message: 'Course already registered for this term' });
      }

      const newCourse = {
        courseName,
        courseCode,
        startDate,
        endDate,
        tuitionFee,
      };

      const targetTerm = user.registeredCourses.find((c) => c.term === term);
      targetTerm.courses.push(newCourse);

      await user.save();

      res.status(201).json({ message: 'Course registered successfully', term });
    } else {
      res.status(401).json({ message: 'User not authenticated' });
    }
  } catch (error) {
    console.error('Error registering course:', error);
    res.status(500).json({ message: 'Error registering course' });
  }
});


//Get courses then display on My Courses Page 
app.get('/courses/student/registered', async (req, res) => {
  try {
    if (req.session && req.session.user) {
      const userId = req.session.user._id; 

      const user = await User.findOne({ userID: userId });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const registeredCoursesByTerm = user.registeredCourses; 

      if (!registeredCoursesByTerm || registeredCoursesByTerm.length === 0) {
        return res.status(404).json({ message: 'No registered courses found for this user' });
      }

      res.status(200).json({ coursesByTerm: registeredCoursesByTerm });
    } else {
      res.status(401).json({ message: 'User not authenticated' });
    }
  } catch (error) {
    console.error('Error fetching registered courses:', error);
    res.status(500).send('Error fetching registered courses');
  }
});

//Drop Registered Courses 
app.delete('/courses/student/registered/:courseCode', async (req, res) => {
  try {
    if (req.session && req.session.user) {
      const courseCodeToDelete = req.params.courseCode;
      const userId = req.session.user._id;

      const user = await User.findOne({ userID: userId });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const registeredCoursesByTerm = user.registeredCourses;

      if (!registeredCoursesByTerm || registeredCoursesByTerm.length === 0) {
        return res.status(404).json({ message: 'No registered courses found for this user' });
      }

      let courseFound = false;

      for (const term of registeredCoursesByTerm) {
        const courses = term.courses;

        const courseIndex = courses.findIndex(course => course.courseCode === courseCodeToDelete);

        if (courseIndex !== -1) {
          courses.splice(courseIndex, 1);
          courseFound = true;
          break;
        }
      }

      if (!courseFound) {
        return res.status(404).json({ message: 'Course not found in registered courses' });
      }

      user.markModified('registeredCourses');
      await user.save();

      return res.json({ message: `Course ${courseCodeToDelete} deleted successfully` });
    } else {
      res.status(401).json({ message: 'User not authenticated' });
    }
  } catch (error) {
    console.error('Error deleting course:', error);
    return res.status(500).json({ message: 'Error deleting course', error: error.message });
  }
});




/////////////////////////////////////////////////////////////////////////////////////////////////////////

//Middleware for student contact forms
const StudentForm = require('./models/formsSchema.js')

app.get('/contact-form', async (req, res) => {
  try {
    if (req.session && req.session.user) {
      const userId = req.session.user._id;

      const user = await User.findOne({ userID: userId }); 

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const dob = user.dateOfBirth.toISOString().split('T')[0]; 

      res.status(200).json({
        _id: user.userID,
        firstName: user.firstName, 
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        dob,
        department: user.department,
        program: user.program,
      });
    } else {
      return res.status(401).json({ message: 'User not authenticated' });
    }
  } catch (error) {
    console.error('Error getting user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/contact/student-form', async (req, res) => {
  try {
    if (req.session && req.session.user) {
      const formData = req.body; 

      if (
        !formData.userId ||
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.phone ||
        !formData.dob ||
        !formData.department ||
        !formData.program ||
        !formData.question
      ) {
        return res.status(400).json({ error: 'Incomplete form data' });
      }

      const newFormEntry = new StudentForm({
        userID: formData.userId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        department: formData.department,
        program: formData.program,
        question: formData.question,
      });

      await newFormEntry.save();

      res.status(201).json({ message: 'Form submitted successfully' });
  } else {
    res.status(401).json({ message: 'User not authenticated' });
  }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while submitting the form' });
  }
});


//Get contact forms to display in Admin page
app.get('/contact/student-form', async (req, res) => {
  try {
    if (req.session && req.session.user) {

      const submittedForms = await StudentForm.find(); 

      res.status(200).json(submittedForms); 
    } else {
      res.status(401).json({ message: 'User not authenticated' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching form data' });
  }
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////

// View registered students
app.get('/instructor/view-my-student/courses', async (req, res) => {
  try {
    if (req.session && req.session.user) {

      const students = await User.find({ role: 'student' }); 

      const studentWithCourses = await Promise.all(
        students.map(async (student) => {
          const studentRegisteredCourses = await User.findOne({ _id: student._id })
            .populate('registeredCourses.courses');

          return {
            studentID: student.userID,
            name: `${student.firstName} ${student.lastName}`,
            email: student.email,
            phone: student.phoneNumber,
            dateOfBirth: student.dateOfBirth.toISOString().split('T')[0],
            program: student.program,
            department: student.department,
            registeredCourses: studentRegisteredCourses.registeredCourses
          };
        })
      );
      res.status(200).json({ studentWithCourses });
    } else {
      res.status(401).json({ message: 'User not authenticated' });
    }
  } catch (error) {
    console.error('Error fetching registered courses for students', error);
    res.status(500).send('Error fetching registered courses for students');
  }
});













