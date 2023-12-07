import React, { Component } from "react";
import './Register.css';

class Register extends React.Component {

  submitClick = async (event) => {
    event.preventDefault();
    const form = event.target.form;
    const formData = new FormData(form);
    const user = {};

    formData.forEach((value, key) => {
      user[key] = value;
    });

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const { redirectURL } = await response.json();
        window.location.href = `http://localhost:3000${redirectURL}`;
      } else {
        const errorParagraph = document.getElementById('errorMessage');
        errorParagraph.textContent = 'Registration failed';
        errorParagraph.style.color = 'darkred';

        // Check specific fields for validation messages
        const emailField = form.querySelector('input[name="email"]');
        const phoneField = form.querySelector('input[name="phoneNumber"]');
        if (!emailField.checkValidity()) {
          errorParagraph.textContent = emailField.validationMessage;
        } else if (!phoneField.checkValidity()) {
          errorParagraph.textContent = phoneField.validationMessage;
        }
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };


  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <p id="errorMessage"></p> 
        <form>
          <input type="text" name="firstName" placeholder="First Name" />
          <br/><br/>
          <input type="text" name="lastName" placeholder="Last Name" />
          <br/><br/>
          <input type="text" name="email" placeholder="Email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" title="Please enter a valid email address (e.g. johndoe@gmail.com)" required />
          <br/><br/>
          <input type="text" name="phoneNumber" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" title="Please enter a phone number in the format 123-456-7890" required />
          <br/><br/>
          <span style={{ color: 'black' }}>Date of Birth: </span>
          <input type="date" name="dateOfBirth" placeholder="Date of Birth" />
          <br/><br/>
          <input type="text" name="department" placeholder="Department" />
          <br/><br/>
          <span style={{ color: 'black' }}>Program: </span>
          <select name="program">
              <option value="Diploma">Diploma</option>
              <option value="Post-Diploma">Post-Diploma</option>
              <option value="Certificate">Certificate</option>
          </select>
          <br/><br/>
          <span style={{ color: 'black' }}>Status: </span>
          <select name="role">
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
          <br/><br/>
          <input type="text" name="username" placeholder="Username" />
          <br/><br/>
          <input type="password" name="password" placeholder="Password" />
          <br/><br/>
          <button onClick={this.submitClick} id="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Register;