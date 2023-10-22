import React, { Component } from 'react';

class Information extends Component {
  render() {
    const { userObject } = this.props;
    return (
      <div>
        <p>Contact Form will automatically get student details from the system!</p>
        <div>
          <label>First Name:</label>
          <input type="text" value={userObject.firstName} readOnly />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" value={userObject.lastName} readOnly />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={userObject.email} readOnly />
        </div>
        <div>
          <label>Phone:</label>
          <input type="tel" value={userObject.phone} readOnly />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input type="date" value={userObject.dob} readOnly />
        </div>
        <div>
          <label>Department:</label>
          <input type="text" value={userObject.department} readOnly />
        </div>
        <div>
          <label>Program:</label>
          <input type="text" value={userObject.program} readOnly />
        </div>
      </div>
    );
  }
}

export default Information;
