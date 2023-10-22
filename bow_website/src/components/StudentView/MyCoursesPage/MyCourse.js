import React, { useState } from 'react';
import RandomCourse from './ExampleRandomCourse';
import coursesData from '../AddCoursesPage/coursesData';

const MyCourses = () => {
  const [isActionConfirming, setIsActionConfirming] = useState(false);

  return (
    <div>
      <br />
      <h1>My Courses </h1>
      <p>These are example data only, will implement actual registered courses once the back-end is connected!</p>
      {Object.keys(coursesData).map((term) => (
        <RandomCourse key={term} term={term} isActionConfirming={isActionConfirming} setIsActionConfirming={setIsActionConfirming} />
      ))}
    </div>
  );
};

export default MyCourses;