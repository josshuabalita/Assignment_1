import React from 'react';

{/* This component will be added once I have back end connected and can be viewed on another page called "Fees" */}
const TuitionFeeTable = ({ registeredCourses }) => {
  return (
    <div>
      <h2>Tuition Fee</h2>
      <table>
        <thead>
          <tr>
            <th>Date Registered</th>
            <th>Term</th>
            <th>Course Code</th>
            <th>Tuition Fee</th>
          </tr>
        </thead>
        <tbody>
          {registeredCourses.map((course, index) => (
            <tr key={index}>
              <td>{course.dateRegistered}</td>
              <td>{course.term}</td>
              <td>{course.course.courseCode}</td>
              <td>{course.course.tuitionFee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TuitionFeeTable;