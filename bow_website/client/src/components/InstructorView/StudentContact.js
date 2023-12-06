import React, { useState, useEffect } from 'react';
import ProgramFilter from './filterProgramResults';
import "./StudentContact.css";
import styles from '../StudentView/AddCoursesPage/addCourseStyle.module.css';

function SubmittedContactForm({ userObject }) {
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [submittedForms, setSubmittedForms] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/contact/student-form') 
      .then(response => response.json())
      .then(data => setSubmittedForms(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleProgramFilterChange = (e) => {
    setSelectedProgram(e.target.value);
  };

  const filteredUsers = selectedProgram === 'all'
    ? submittedForms
    : submittedForms.filter(user => user.program === selectedProgram);

  return (
    <div>
      <h1 className='forms'>Received Contact Forms</h1>
      <div className={styles.containerCourses}>
        <ProgramFilter
          selectedProgram={selectedProgram}
          handleProgramFilterChange={handleProgramFilterChange}
        />
        <hr />
        {filteredUsers.map((user, index) => (
          <div key={index}>
            <table>
              <tbody>
              <tr>
                  <td>Student ID:</td>
                  <td>{user.userID}</td>
                </tr>
                <tr>
                  <td>First Name:</td>
                  <td>{user.firstName}</td>
                </tr>
                <tr>
                  <td>Last Name:</td>
                  <td>{user.lastName}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td>Phone:</td>
                  <td>{user.phone}</td>
                </tr>
                <tr>
                  <td>Date of Birth:</td>
                  <td>{user.dob}</td>
                </tr>
                <tr>
                  <td>Department:</td>
                  <td>{user.department}</td>
                </tr>
                <tr>
                  <td>Program:</td>
                  <td>{user.program}</td>
                </tr>
                <tr>
                  <td>Question:</td>
                  <td>{user.question}</td>
                </tr>
              </tbody>
            </table>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubmittedContactForm;