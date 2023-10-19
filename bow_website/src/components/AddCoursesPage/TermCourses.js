import React from "react";

const TermCourses = ({term, courses }) => {
    return (
        <div>
          <h2>{term}</h2>
          <ul>
            {courses.map((course, index) => (
              <li key={index}>
                <strong>{course.courseName}, {course.courseCode}</strong>
                <br />
                <span>Start Date: {course.startDate}</span>
                <br />
                <span>End Date: {course.endDate}</span>
                <br />
                <span>Tuition Fee: {course.tuitionFee}</span>
              </li>
            ))}
          </ul>
        </div>
      );
}

export default TermCourses;