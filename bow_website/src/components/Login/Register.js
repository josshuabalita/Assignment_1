import React, { Component } from "react";

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
        window.location.href = "/login/student"; 
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
        <input
        type="text"
        placeholder="First Name"
        value={this.state.user.firstName}
        onChange={(e) => this.handleInputChange(e, "firstName")}
        />

        <input
        type="text"
        placeholder="Last Name"
        value={this.state.user.lastName}
        onChange={(e) => this.handleInputChange(e, "lastName")}
        />

        <input
        type="text"
        placeholder="Email"
        value={this.state.user.email}
        onChange={(e) => this.handleInputChange(e, "email")}
        />

        <input
        type="text"
        placeholder="Phone Number"
        value={this.state.user.phone}
        onChange={(e) => this.handleInputChange(e, "phone")}
        />

        <input
        type="date"
        placeholder="Date of Birth"
        value={this.state.user.dateOfBirth}
        onChange={(e) => this.handleInputChange(e, "dateOfBirth")}
        />

        <input
        type="text"
        placeholder="Department"
        value={this.state.user.department}
        onChange={(e) => this.handleInputChange(e, "department")}
        />

        <input
        type="text"
        placeholder="Program"
        value={this.state.user.program}
        onChange={(e) => this.handleInputChange(e, "program")}
        />

        <select
        value={this.state.user.role}
        onChange={(e) => this.handleInputChange(e, "role")}
        >
        <option value="student">Student</option>
        <option value="instructor">Instructor</option>
        </select>

        <input
        type="text"
        placeholder="Username"
        value={this.state.user.username}
        onChange={(e) => this.handleInputChange(e, "username")}
        />

        <input
        type="password"
        placeholder="Password"
        value={this.state.user.password}
        onChange={(e) => this.handleInputChange(e, "password")}
        />
        <button onClick={this.submitClick} id="submit">
          Register
        </button>
      </div>
    );
  }
}

export default Register;