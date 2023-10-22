import React, { Component } from 'react';

class ChangeCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedNewCourse: this.props.termCourses[0], 
        };
    }

    handleConfirmChange = () => {
        const { selectedNewCourse } = this.state;
        if (selectedNewCourse) {
            this.props.onConfirmChange(selectedNewCourse);
        }
    }

    handleCourseSelect = (e) => {
        const selectedCourseCode = e.target.value;
        const course = this.props.termCourses.find((c) => c.courseCode === selectedCourseCode);
        this.setState({ selectedNewCourse: course });
    }

    render() {
        const { term, termCourses, onCancelChange } = this.props;
        const { selectedNewCourse } = this.state;

        return (
            <div>
                <h3>Select a new course for {term}:</h3>
                <select
                    value={selectedNewCourse ? selectedNewCourse.courseCode : ''}
                    onChange={this.handleCourseSelect}
                >
                    {termCourses.map((course) => (
                        <option key={course.courseCode} value={course.courseCode}>
                            {course.courseName}
                        </option>
                    ))}
                </select>
                <button onClick={this.handleConfirmChange}>Confirm Change</button>
                <button onClick={onCancelChange}>Cancel</button>
            </div>
        );
    }
}

export default ChangeCourse;