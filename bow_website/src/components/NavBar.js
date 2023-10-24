import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const StudentNavigation = () => {
  const handleSignOut = () => {
    window.location.href = '/';
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
        <li>
          <button onClick={handleSignOut}>Sign Out</button>
        </li>
      </ul>
    </nav>
  );
};

const InstructorNavigation = () => {
  const handleSignOutInstructor = () => {
    window.location.href = '/login/instructor';
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/instructor/viewcourses">Add New Courses</Link>
        </li>
        <li>
          <Link to="/instructor/viewstudents">View My Students</Link>
        </li>
        <li>
          <Link to="/instructor/studentcontactforms">Student Contact Forms</Link>
        </li>
        <li>
          <button onClick={handleSignOutInstructor}>Sign Out</button>
        </li>
      </ul>
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