import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const hiddenPaths = ['/','/login/instructor', '/register'];

  const isStudentLoggedIn = !hiddenPaths.includes(location.pathname);

  const handleSignOut = () => {
    window.location.href = '/';
  };

  if (!isStudentLoggedIn) {
    return null;
  }

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

export default Navigation;