import React from "react";

const RegisteredCourses = ({ registeredCourses, onRemoveCourse }) => {
  // Group the registered courses by term
  const coursesByTerm = {};
  registeredCourses.forEach((course) => {
    const { term } = course;
    if (!coursesByTerm[term]) {
      coursesByTerm[term] = [];
    }
    coursesByTerm[term].push(course);
  });

  return (
    <div>
      <h2>Registered Courses</h2>
      {Object.keys(coursesByTerm).map((term, index) => (
        <div key={index}>
          <h3>{term}</h3>
          <ul>
            {coursesByTerm[term].map((course, index) => (
              <li key={index}>
                {course.course.courseName} ({course.course.courseCode})
                <button onClick={() => onRemoveCourse(course)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RegisteredCourses;
