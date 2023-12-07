import React, { Component } from "react";
import './Login.css';

class StudentLogin extends Component {
  loginClick = async (event) => {
    event.preventDefault();
    const form = event.target.form;
    const formData = new FormData(form);
    const login = {};

    formData.forEach((value, key) => {
      login[key] = value;
    });

    try {
      const response = await fetch('http://localhost:8080/login/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(login),
        credentials: 'include', 
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message;
        const errorDiv = document.getElementById('error-message');
        errorDiv.textContent = errorMessage;
      } else {
        const data = await response.json();
        window.location.href = data.redirectURL;
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  signInAsInstructor = () => {
    window.location.href = "/login/instructor";
  };

  redirectToRegister = () => {
    window.location.href = "/register";
  };

  render() {
    return (
      <div>
        <div className="Welcome">
          <p>Welcome to the Student Portal!</p>
          <p>Please sign in using your student account.</p>
        </div>

        <div className="Information">
          <form>
            <input type="text" placeholder="Username" name="username" />
            <input type="password" placeholder="Password" name="password" />
            <br />
            <div id="error-message" className="ErrorMessage"></div>
            <button onClick={this.loginClick}>Login</button>
            <button>Forgot Password?</button>
          </form>
          <button onClick={this.signInAsInstructor}>Sign in as Instructor</button>

          <div>
            <p>Not yet Registered? </p>
            <button onClick={this.redirectToRegister}>Register Here</button>
          </div>
        </div>
      </div>
    )
  }
}

export default StudentLogin;