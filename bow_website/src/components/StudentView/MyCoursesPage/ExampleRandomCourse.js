import React, { Component } from 'react';
import coursesData from '../AddCoursesPage/coursesData';
import ChangeCourse from './ChangeCourse';
import DropCourse from './DropCourse';

class RandomCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCourse: this.getRandomCourse(coursesData[props.term]),
            isChangeWindowOpen: false,
            isDropWindowOpen: false,
        };
    }

    getRandomCourse(courseArray) {
        const randomIndex = Math.floor(Math.random() * courseArray.length);
        return courseArray[randomIndex];
    }

    changeCourse = () => {
        this.props.setIsActionConfirming(true);
        this.setState({ isChangeWindowOpen: true });
    }

    dropCourse = () => {
        this.props.setIsActionConfirming(true);
        this.setState({ isDropWindowOpen: true });
    }

    confirmChange = (newCourse) => {
        this.setState({ currentCourse: newCourse, isChangeWindowOpen: false });
        this.props.setIsActionConfirming(false);
    }

    confirmDrop = () => {
        this.setState({ currentCourse: null, isDropWindowOpen: false });
        this.props.setIsActionConfirming(false);
    }

    cancelChange = () => {
        this.setState({ isChangeWindowOpen: false });
        this.props.setIsActionConfirming(false);
    }

    cancelDrop = () => {
        this.setState({ isDropWindowOpen: false });
        this.props.setIsActionConfirming(false);
    }

    render() {
        const { term, isActionConfirming } = this.props;
        const { currentCourse, isChangeWindowOpen, isDropWindowOpen } = this.state;
        const termCourses = coursesData[term];

        return (
            <div>
                <h2>{term}</h2>
                {currentCourse ? (
                    <div>
                        <strong>{currentCourse.courseName}</strong>
                        <br />
                        <span>Course Code: {currentCourse.courseCode}</span>
                        <br />
                        <span>Start Date: {currentCourse.startDate}</span>
                        <br />
                        <span>End Date: {currentCourse.endDate}</span>
                        <br />
                        <span>Tuition Fee: {currentCourse.tuitionFee}</span>
                        <br />
                    </div>
                ) : (
                    <p>No course selected.</p>
                )}
                {currentCourse && !isActionConfirming && (
                    <div>
                        <button onClick={this.changeCourse}>Change Course</button>
                        <button onClick={this.dropCourse}>Drop Course</button>
                    </div>
                )}

                {isChangeWindowOpen && currentCourse && (
                    <ChangeCourse
                        term={term}
                        termCourses={termCourses}
                        onConfirmChange={this.confirmChange}
                        onCancelChange={this.cancelChange}
                        currentCourse={currentCourse}
                    />
                )}

                {isDropWindowOpen && currentCourse && (
                    <DropCourse
                        term={term}
                        currentCourse={currentCourse}
                        onConfirmDrop={this.confirmDrop}
                        onCancelDrop={this.cancelDrop}
                    />
                )}
            </div>
        );
    }
}

export default RandomCourse;