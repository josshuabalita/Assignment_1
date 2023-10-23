import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourseRegistrationPage from './components/StudentView/AddCoursesPage/AddCourse';
import MyCourses from './components/StudentView/MyCoursesPage/MyCourse';
import ContactForm from './components/StudentView/StudentContactForm/studentContactForm';
import Register from './components/Login/Register';
import StudentLogin from './components/Login/StudentLogin';
import InstructorLogin from './components/Login/InstructorLogin';
import Navigation from './components/NavBar';

function App() {

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<StudentLogin />} />
        <Route path="login/instructor" element={<InstructorLogin />} />

        <Route path="/student">
          <Route path="addcourses" element={<CourseRegistrationPage />} />
          <Route path="mycourses" element={<MyCourses />} />
          <Route path="contact" element={<ContactForm />} />
        </Route>
        
        <Route path="register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
