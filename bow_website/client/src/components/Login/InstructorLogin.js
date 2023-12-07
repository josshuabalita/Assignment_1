import React, { Component } from "react";
import './Login.css';

class InstructorLogin extends Component {
  loginClick = async (event) => {
    event.preventDefault();
    const form = event.target.form;
    const formData = new FormData(form);
    const login = {};

    formData.forEach((value, key) => {
      login[key] = value;
    });

    try {
      const response = await fetch('http://localhost:8080/login/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(login),
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

  signInAsStudent = () => {
    window.location.href = "/";
  };

  Register = () => {
    window.location.href = "/register";
  };

  render() {
    return (
      <div>
        <div className="Welcome">
          <p>Welcome to the Instructor Portal!</p>
          <p>Please sign in using your instructor account.</p>
        </div>
        <div className="Information">
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
            />
            <br/>
            <div id="error-message" className="ErrorMessage"></div>
            <button onClick={this.loginClick}>Login</button>
            <button>Forgot Password?</button>
          </form>

          <button onClick={this.signInAsStudent}>Sign in as Student</button>

            <div>
              <p>Not yet Registered? </p>
              <button onClick={this.Register}>Register Here</button>
            </div>

        </div>
      </div>
    );
  }
}

export default InstructorLogin;