import React from 'react';
import TermCourses from './TermCourses';
import coursesData from './coursesData';

const AddCoursePage = () => {
    const terms = Object.keys(coursesData);

    return (
        <div>
          <h2>My Courses</h2>
          {terms.map((term, index) => (
            <TermCourses key={index} term={term} courses={coursesData[term]} />
          ))}
        </div>
    );
}

export default AddCoursePage;