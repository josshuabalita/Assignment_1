import React, { useState } from 'react';
import ProgramFilter from './filterProgramResults';
import "./StudentContact.css";
import styles from '../StudentView/AddCoursesPage/addCourseStyle.module.css';

function SubmittedContactForm({ userObject }) {
  const [selectedProgram, setSelectedProgram] = useState('all'); // Initialize selectedProgram inside the component function

  const sampleUserObjects = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
      dob: '1999-01-15',
      department: 'Software Development',
      program: 'Diploma',
      question: 'Hello There! How are you?',
    },
    {
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alicesmith@example.com',
      phone: '987-654-3210',
      dob: '1995-08-20',
      department: 'Software Development',
      program: 'Post Diploma',
      question: 'I have a question about your services.',
    },
    {
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bj@example.com',
      phone: '555-123-4567',
      dob: '1988-03-10',
      department: 'Software Development',
      program: 'Certificate',
      question: 'Is there a deadline for the application?',
    },
    {
      firstName: 'Ella',
      lastName: 'Brown',
      email: 'ella@example.com',
      phone: '777-999-5555',
      dob: '1990-12-05',
      department: 'Software Development',
      program: 'Diploma',
      question: 'I need more information about the scholarship program.',
    },
  ];

  const handleProgramFilterChange = (e) => {
    setSelectedProgram(e.target.value);
  };

  const filteredUsers = selectedProgram === 'all'
  ? sampleUserObjects
  : sampleUserObjects.filter(user => user.program === selectedProgram);

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