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
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <form>
          <input type="text" name="firstName" placeholder="First Name" />
          <br/><br/>
          <input type="text" name="lastName" placeholder="Last Name" />
          <br/><br/>
          <input type="text" name="email" placeholder="Email" />
          <br/><br/>
          <input type="text" name="phoneNumber" placeholder="Phone Number" />
          <br/><br/>
          <span style={{ color: 'black' }}>Date of Birth: </span>
          <input type="date" name="dateOfBirth" placeholder="Date of Birth" />
          <br/><br/>
          <input type="text" name="department" placeholder="Department" />
          <br/><br/>
          <input type="text" name="program" placeholder="Program" />
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