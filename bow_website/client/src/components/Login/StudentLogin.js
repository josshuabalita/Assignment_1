import React, { Component } from "react";
import './Login.css';

class StudentLogin extends Component {
    constructor(props){
        super(props);
        this.state={
            logins: [],
            login: {
                username:"",
                password:"",
            },
        };
    }

    loginClick = (event) => {
        event.preventDefault();
      
        const { username, password } = this.state.login;
      
        if (username && password) {
          const newLogin = { ...this.state.login };
      
          this.setState((prevState) => ({
            logins: [...prevState.logins, newLogin],
            login: {
              username: "",
              password: "",
            },
          }));
      
          console.log("New Login Details: ", newLogin);
          window.location.href = "/student/addcourses";
        } else {
          alert("Please enter both username and password.");
        }
      };

    handleInputChange = (event, field) => {

        const { value } = event.target;
    
        this.setState((prevState) => ({
    
          login: {
    
            ...prevState.login,
    
            [field]: value,
    
          },

    
        }));
    
    };

    signInAsInstructor =() => {
        window.location.href = "/login/instructor";
    }

    Register = () => {
        window.location.href = "/register";
    }

    render() {
        return(
            <div>
                <div className="Welcome">
                    <p>Welcome to the Student Portal!</p>
                    <p>Please sign in using your student account.</p>
                </div>

                <div className="Information">
                <input
                type="text"
                placeholder="Username"
                value={this.state.login.username}
                onChange={(e) => this.handleInputChange(e, "username")}
                />
                
                <input
                type="password"
                placeholder="Password"
                value={this.state.login.password}
                onChange={(e) => this.handleInputChange(e, "password")}
                />
                <br/>
                <button onClick={this.loginClick}>Login</button>
              
                <button>Forgot Password?</button>
        
                <button onClick={this.signInAsInstructor}>Sign in as Instructor</button>

                <div>
                    <p>Not yet Registered? </p>
                    <button onClick={this.Register}>Register Here</button>
                </div>
           
            </div>
            </div>
        )
    }
}

export default StudentLogin;