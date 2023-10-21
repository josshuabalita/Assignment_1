import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/addcourses">Add Courses</Link>
        </li>
        <li>
          <Link to="/addcourses/mycourses">My Courses</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
