import React, { useState } from 'react';
import students from './studentsData';
import ProgramFilter from './filterProgramResults';

function ViewStudents() {
  const tableStyle = {
    borderCollapse: 'collapse',
    margin: 'auto',
    width: '90%',
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

  const [selectedProgram, setSelectedProgram] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleProgramFilterChange = (e) => {
    setSelectedProgram(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = students.filter(student => {
    return (
      (selectedProgram === 'all' || student.program === selectedProgram) &&
      (student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
       student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
       student.studentId.includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div>
      <h1>View My Students</h1>
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
            <tr key={student.studentId} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
              <td style={cellStyle}>{student.studentId}</td>
              <td style={cellStyle}>{student.firstName} {student.lastName}</td>
              <td style={cellStyle}>{student.email}</td>
              <td style={cellStyle}>{student.phone}</td>
              <td style={cellStyle}>{student.dateOfBirth}</td>
              <td style={cellStyle}>{student.program}</td>
              <td style={cellStyle}>{student.department}</td>
              <td style={cellStyle}>
                <ul>
                  {Object.keys(student.registeredCourses).map((term) => (
                    <li key={term}>
                      <strong>{term}:</strong>
                      <ul>
                        {student.registeredCourses[term].map((courseCode) => (
                          <li key={courseCode} style={cellStyle}>{courseCode}</li>
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
  );
}

export default ViewStudents;