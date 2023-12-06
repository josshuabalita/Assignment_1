import React, { Component } from 'react';

class Information extends Component {
  render() {
    const { userObject } = this.props;

    return (
      <div>
        <div>
          <label>Student ID:</label>
          <input type="number" value={userObject._id || ''} readOnly />
        </div>
        <br />
        <div>
          <label>First Name:</label>
          <input type="text" value={userObject.firstName || ''} readOnly />
        </div>
        <br/>
        <div>
          <label>Last Name:</label>
          <input type="text" value={userObject.lastName || ''} readOnly />
        </div>
        <br/>
        <div>
          <label>Email:</label>
          <input type="email" value={userObject.email || ''} readOnly />
        </div>
        <br/>
        <div>
          <label>Phone:</label>
          <input type="tel" value={userObject.phoneNumber || ''} readOnly />
        </div>
        <br/>
        <div>
          <label>Date of Birth:</label>
          <input type="date" value={userObject.dob || ''} readOnly />
        </div>
        <br/>
        <div>
          <label>Department:</label>
          <input type="text" value={userObject.department || ''} readOnly />
        </div>
        <br/>
        <div>
          <label>Program:</label>
          <input type="text" value={userObject.program || ''} readOnly />
          <br/>
        </div>
        <br/>
      </div>
    );
  }
}

export default Information;
