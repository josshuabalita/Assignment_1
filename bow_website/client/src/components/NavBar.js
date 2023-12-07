import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import "./NavBar.css";

const StudentNavigation = () => {

  const handleSignOut = async () => {
    try {
      await axios.post('http://localhost:8080/logout');
      window.location.href = '/';
      window.history.pushState(null, '', '/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/student/addcourses">Add Courses</Link>
        </li>
        <li>
          <Link to="/student/mycourses">My Courses</Link>
        </li>
        <li>
          <Link to="/student/contact">Student Support</Link>
        </li>
        <br/>
      </ul>
      <button onClick={handleSignOut}>Sign Out</button>
    </nav>
  );
};

const InstructorNavigation = () => {

  const handleSignOutInstructor = async () => {
    try {
      await axios.post('http://localhost:8080/logout');
      window.location.href = '/login/instructor'; 
      window.history.pushState(null, '', '/login/instructor')
    } catch (error) {
      console.error('Error signing out instructor:', error);
    }
  }

  return (
    <nav>
      <ul>
        <li >
          <Link to="/instructor/viewcourses">Add New Courses</Link>
        </li>
        <li>
          <Link to="/instructor/viewstudents">View My Students</Link>
        </li>
        <li>
          <Link to="/instructor/studentcontactforms">Student Contact Forms</Link>
        </li>
      </ul>
      <button onClick={handleSignOutInstructor}>Sign Out</button>
    </nav>
  );
};

const Navigation = () => {
  const location = useLocation();
  const hiddenPaths = ['/', '/login/instructor', '/instructor/viewcourses', '/register'];

  const isStudentLoggedIn = !hiddenPaths.includes(location.pathname);
  const isInstructorLoggedIn = location.pathname.startsWith('/instructor/');

  if (!isStudentLoggedIn && !isInstructorLoggedIn) {
    return null;
  }

  if (isInstructorLoggedIn) {
    return <InstructorNavigation />;
  }

  return <StudentNavigation />;
};

export default Navigation;