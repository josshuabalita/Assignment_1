import React, { Component } from "react";

class InstructorLogin extends Component {
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

        const newLogin = {...this.state.login};

        this.setState((prevState) => ({
            logins: [...prevState.logins, newLogin],

            login: {
                username:"",
                password:""
            },
        }));
        console.log("New Login Details: ", newLogin);
    }

    handleInputChange = (event, field) => {

        const { value } = event.target;
    
        this.setState((prevState) => ({
    
          login: {
    
            ...prevState.login,
    
            [field]: value,
    
          },

    
        }));
    
      };

    signInAsStudent =() => {
        window.location.href = "/login/student";
    }

    Register = () => {
        window.location.href = "/register";
    }

    render() {
        return(
            <div>
                <div>
                    <p>Please sign in using your instructor account.</p>
                </div>

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
                <button onClick={this.loginClick}>Login</button>
                <button>Forgot Password?</button>
                <button onClick={this.signInAsStudent}>Sign in as Student</button>

                <div>
                    <p>Not yet Registered? </p>
                    <button onClick={this.Register}>Register here!!!</button>
                </div>
            </div>
            
        )
    }
}

export default InstructorLogin;