import React, { Component } from "react";
import './Register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        department: "",
        program: "",
        username: "",
        password: "",
        role: "student", 
        id: 0,
      },
    };
  }

  submitClick = (event) => {
    event.preventDefault();
    const newUser = { ...this.state.user };
  
    if (
      newUser.firstName === "" ||
      newUser.lastName === "" ||
      newUser.email === "" ||
      newUser.phone === "" ||
      newUser.dateOfBirth === "" ||
      newUser.department === "" ||
      newUser.program === "" || 
      newUser.username === "" ||
      newUser.password === ""
    ) {
      alert("Please fill in all required fields.");
    } else {
      this.setState((prevState) => ({
        users: [...prevState.users, newUser],
        user: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          department: "",
          program: "",
          username: "",
          password: "",
          role: "student",
          id: 0,
        },
      }));
      console.log("New User Details:", newUser);
      
      if (newUser.role === "student") {
        window.location.href = "/"; 
      } else if (newUser.role === "instructor") {
        window.location.href = "/login/instructor"; 
      }
    }
  };

  handleInputChange = (event, field) => {
    const { value } = event.target;
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [field]: value,
      },
    }));
  };

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <input
        type="text"
        placeholder="First Name"
        value={this.state.user.firstName}
        onChange={(e) => this.handleInputChange(e, "firstName")}
        />
      
      <br/>
      <br/>
        <input
        type="text"
        placeholder="Last Name"
        value={this.state.user.lastName}
        onChange={(e) => this.handleInputChange(e, "lastName")}
        />
      <br/>
      <br/>
        <input
        type="text"
        placeholder="Email"
        value={this.state.user.email}
        onChange={(e) => this.handleInputChange(e, "email")}
        />
      <br/>
      <br/>
        <input
        type="text"
        placeholder="Phone Number"
        value={this.state.user.phone}
        onChange={(e) => this.handleInputChange(e, "phone")}
        />
      <br/>
      <br/>
        <input
        type="date"
        placeholder="Date of Birth"
        value={this.state.user.dateOfBirth}
        onChange={(e) => this.handleInputChange(e, "dateOfBirth")}
        />
      <br/>
      <br/>
        <input
        type="text"
        placeholder="Department"
        value={this.state.user.department}
        onChange={(e) => this.handleInputChange(e, "department")}
        />
      <br/>
      <br/>
        <input
        type="text"
        placeholder="Program"
        value={this.state.user.program}
        onChange={(e) => this.handleInputChange(e, "program")}
        />
      <br/>
      <br/>
        <select
        value={this.state.user.role}
        onChange={(e) => this.handleInputChange(e, "role")}
        >
        <option value="student">Student</option>
        <option value="instructor">Instructor</option>
       
        </select>
        <br/>
        <br/>
        <input
        type="text"
        placeholder="Username"
        value={this.state.user.username}
        onChange={(e) => this.handleInputChange(e, "username")}
        />
        <br/>
        <br/>
        <input
        type="password"
        placeholder="Password"
        value={this.state.user.password}
        onChange={(e) => this.handleInputChange(e, "password")}
        />
        <br/>
        <br/>
        <button onClick={this.submitClick} id="submit">
          Register
        </button>
      </div>
    );
  }
}

export default Register;