import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const hiddenPaths = ['/login/instructor', '/login/student', '/register'];

  const hideNavigation = hiddenPaths.includes(location.pathname);

  if (hideNavigation) {
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
      </ul>
    </nav>
  );
};

export default Navigation;