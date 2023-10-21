import React from "react";

const SearchCourses = ({ onSearchChange, searchResults }) => {
  return (
    <div>
      <h2>Search Courses</h2>
      <input
        type="text"
        placeholder="Course Code or Name"
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>
            <strong>{result.course.courseName}, {result.course.courseCode}</strong>
            <br />
            <span>Start Date: {result.course.startDate}</span>
            <br />
            <span>End Date: {result.course.endDate}</span>
            <br />
            <span>Tuition Fee: {result.course.tuitionFee}</span>
            <br />
            <span>Term: {result.term}</span> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchCourses;
