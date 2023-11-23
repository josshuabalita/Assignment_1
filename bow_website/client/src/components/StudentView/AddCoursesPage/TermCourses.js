import React from "react";

const TermCourses = ({ term, courses, onAddCourse, termSelected, registrationMessage }) => {
  if (!termSelected) {
    return (
      <div>
        <h2>Please select a term to view courses.</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>{term}</h2>
      <ul>
        {courses.map((course, index) => (
          <li key={index}>
            <strong>{course.courseName}</strong>
            <br />
            <span>Course Code: {course.courseCode}</span>
            <br />
            <span>Start Date: {course.startDate}</span>
            <br />
            <span>End Date: {course.endDate}</span>
            <br />
            <span>Tuition Fee: {course.tuitionFee}</span>
            <br />
            <button onClick={() => onAddCourse(course)}>Add</button>
          </li>
        ))}
      </ul>
      {registrationMessage && (
        <div>
          <p style={{ color: 'red' }}>{registrationMessage}</p>
        </div>
      )}
    </div>
  );
};

export default TermCourses;