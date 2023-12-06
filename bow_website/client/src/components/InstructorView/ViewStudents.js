import React, { useState, useEffect } from 'react';
import ProgramFilter from './filterProgramResults';
import "./ViewStudents.css";
import styles from '../StudentView/AddCoursesPage/addCourseStyle.module.css';

function ViewStudents() {
  const tableStyle = {
    borderCollapse: 'collapse',
    margin: 'auto',
    width: '100%',
  };

  const cellStyle = {
    border: '1px solid #000',
    padding: '8px',
    textAlign: 'left',
  };

  const oddRowStyle = {
    backgroundColor: '#f2f2f2',
  };

  const evenRowStyle = {
    backgroundColor: 'white',
  };

  const [students, setStudents] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/instructor/view-my-student/courses')
      .then((response) => response.json())
      .then((data) => {
        setStudents(data.studentWithCourses || []); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  const handleProgramFilterChange = (e) => {
    setSelectedProgram(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = students.filter((student) => {
    return (
      (selectedProgram === 'all' || student.program === selectedProgram) &&
      (student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.studentID.toString().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div>
      <h1 className='students'>View My Students</h1>
      <div className={styles.containerCourses}>
          <ProgramFilter
            selectedProgram={selectedProgram}
            handleProgramFilterChange={handleProgramFilterChange}
          />
          <input
            type="text"
            placeholder="Search student name or ID"
            onChange={handleSearchChange}
          />
          <hr />
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={cellStyle}>Student ID</th>
                <th style={cellStyle}>Name</th>
                <th style={cellStyle}>Email</th>
                <th style={cellStyle}>Phone</th>
                <th style={cellStyle}>Date of Birth (yyyy-mm-dd)</th>
                <th style={cellStyle}>Program</th>
                <th style={cellStyle}>Department</th>
                <th style={cellStyle}>Registered Courses</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
              <tr key={student.studentID} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
                  <td style={cellStyle}>{student.studentID}</td>
                  <td style={cellStyle}>{student.name}</td>
                  <td style={cellStyle}>{student.email}</td>
                  <td style={cellStyle}>{student.phone}</td>
                  <td style={cellStyle}>{student.dateOfBirth}</td>
                  <td style={cellStyle}>{student.program}</td>
                  <td style={cellStyle}>{student.department}</td>
                  <td style={cellStyle}>
                    <ul>
                      {student.registeredCourses.map((term, termIndex) => (
                        <li key={`${student.studentID}-${termIndex}`}>
                          <strong>{term.term}:</strong>
                          <ul>
                            {term.courses.map((course, courseIndex) => (
                              <li key={`${student.studentID}-${termIndex}-${courseIndex}`} style={cellStyle}>
                                {course.courseCode}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  );
}

export default ViewStudents;