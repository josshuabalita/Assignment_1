import React, { Component } from 'react';
import Information from './Information';
import styles from '../AddCoursesPage/addCourseStyle.module.css'

class ContactForm extends Component {
  constructor() {
    super();
    this.state = {
      question: '',
      isSubmitted: false,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userObject = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@mybvc.ca',
        phone: '123-456-7890',
        dob: '1999-01-15',
        department: 'Software Development',
        program: 'Diploma',
      };

      await fetch('http://localhost:8080/contact/student-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...this.state,
          ...userObject,
        }),
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
    const userObject = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@mybvc.ca',
      phone: '123-456-7890',
      dob: '1999-01-15',
      department: 'Software Development',
      program: 'Diploma',
    };

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