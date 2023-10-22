import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourseRegistrationPage from './components/StudentView/AddCoursesPage/AddCourse';
import MyCourses from './components/StudentView/MyCoursesPage/MyCourse';
import ContactForm from './components/StudentView/StudentContactForm/studentContactForm';
import Navigation from './components/NavBar';

function App() {

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/addcourses" element={<CourseRegistrationPage/>}/>
        <Route path="/mycourses" element={<MyCourses />} /> 
        <Route path="/contact" element={< ContactForm />} />
      </Routes>
    </Router>
  );
}

export default App;
