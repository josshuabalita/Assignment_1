import React from "react";

//use this component for added courses to my courses page
const RegisteredCourses = ({ registeredCourses, onRemoveCourse }) => {
    return (
      <div>
        <h2>Registered Courses</h2>
        <ul>
          {registeredCourses.map((course, index) => (
            <li key={index}>
              {course.courseName} ({course.courseCode})
              <button onClick={() => onRemoveCourse(course)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    );
};
  
export default RegisteredCourses;
