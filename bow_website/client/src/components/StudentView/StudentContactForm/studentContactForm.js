import React, { Component } from 'react';
import Information from './Information';
import styles from '../AddCoursesPage/addCourseStyle.module.css'

class ContactForm extends Component {
  constructor() {
    super();
    this.state = {
      question: '',
      isSubmitted: false,
      userObject: {}, 
      formDetails: {}, 
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:8080/contact-form', {
        credentials: 'include', 
      });

      if (response.ok) {
        const userData = await response.json();
        this.setState({ userObject: userData });

        this.setState({
          formDetails: {
            userId: userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phoneNumber,
            dob: userData.dob,
            department: userData.department,
            program: userData.program,
          },
        });
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { question, formDetails } = this.state;
  
      const formData = {
        question,
        ...formDetails,
      };
  
      await fetch('http://localhost:8080/contact/student-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
  
      this.setState({ isSubmitted: true, question: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  handleQuestionChange = (e) => {
    this.setState({ question: e.target.value, isSubmitted: false });
  };

  render() {
    const { userObject } = this.state;

    return (
      <div>
        <h1>Contact Admin</h1>
        <div className={styles.containerCourses}>
          <form onSubmit={this.handleSubmit}>
            <Information userObject={userObject} />
            <div>
              <label>Your Question:</label>
              <textarea
                value={this.state.question}
                onChange={this.handleQuestionChange}
                required
              />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>

          {this.state.isSubmitted && (
            <div style={{ color: 'red' }}>
              Thank you for reaching out! We received your form and will get back to your question within 3-10 business days. Have a wonderful day!
            </div>
          )}
        </div>
      </div>
    );
  }
}


export default ContactForm;