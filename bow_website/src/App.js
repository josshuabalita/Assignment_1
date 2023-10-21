import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCoursePage from './components/AddCoursesPage/AddCourse';
import MyCourses from './components/MyCoursesPage/MyCourse';
import Navigation from './components/NavBar';

function App() {

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/addcourses" element={<AddCoursePage/>}/>
        <Route path="/addcourses/mycourses" element={<MyCourses />} /> 
      </Routes>
    </Router>
  );
}

export default App;
