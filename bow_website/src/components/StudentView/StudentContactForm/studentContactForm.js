import React, { Component } from 'react';
import Information from './Information';

class ContactForm extends Component {
  constructor() {
    super();
    this.state = {
      question: '',
      isSubmitted: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isSubmitted: true, question: '' });
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
        <h2>Contact Admin</h2>
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
    );
  }
}

export default ContactForm;