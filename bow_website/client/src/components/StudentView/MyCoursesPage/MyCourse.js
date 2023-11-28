import React, { Component } from 'react';
import DropCourse from './DropCourse';
import styles from '../AddCoursesPage/addCourseStyle.module.css';

class MyCourses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            registeredCourses: [],
            actionStates: {}, 
            currentCourse: null,
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/courses/student/registered')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const initialActionStates = {};
                data.courses.forEach(term => {
                    term.courses.forEach(course => {
                        initialActionStates[course._id] = {
                            isChangeWindowOpen: false,
                            isDropWindowOpen: false,
                            isActionConfirming: false,
                        };
                    });
                });
                this.setState({
                    registeredCourses: data.courses,
                    actionStates: initialActionStates,
                });
            })
            .catch(error => {
                console.error('Error fetching registered courses:', error);
            });

            fetch('http://localhost:8080/courses')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ termCourses: data });
            })
            .catch(error => {
                console.error('Error fetching all courses:', error);
            });
    }

    dropCourse = (course) => {
        const { actionStates } = this.state;
    
        if (actionStates[course._id].isActionConfirming) {
            return;
        }
    
        this.setState(prevState => ({
            currentCourse: course,
            actionStates: {
                ...prevState.actionStates,
                [course._id]: {
                    ...prevState.actionStates[course._id],
                    isDropWindowOpen: true,
                    isActionConfirming: true,
                },
            },
        }));
    };

    confirmDrop = async (courseCode) => {
        try {
            const response = await fetch(`http://localhost:8080/courses/student/registered/${courseCode}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.message || 'Failed to delete course');
            }
    
            this.setState(prevState => ({
                currentCourse: null,
                isDropWindowOpen: false,
                isActionConfirming: false,
                isAnyActionConfirming: false,
            }));
    
            window.location.reload();
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    cancelDrop = (courseId) => {
        this.setState(prevState => ({
            actionStates: {
                ...prevState.actionStates,
                [courseId]: {
                    ...prevState.actionStates[courseId],
                    isDropWindowOpen: false,
                    isActionConfirming: false,
                },
            },
        }));
    };

    render() {
        const { registeredCourses, currentCourse, actionStates, termCourses } = this.state;
    
        return (
            <div>
                <h1>My Courses</h1>
                <div className={styles.containerCourses}>
                    {registeredCourses.length > 0 ? (
                        registeredCourses.map(term => (
                            <div key={term._id}>
                                <h2>{term.term}</h2>
                                {term.courses.length > 0 ? (
                                    term.courses.map(course => (
                                        <div key={course._id}>
                                            <strong>{course.courseName}</strong>
                                            <br />
                                            <span>Course Code: {course.courseCode}</span>
                                            <br />
                                            <span>Start Date: {course.startDate}</span>
                                            <br />
                                            <span>End Date: {course.endDate}</span>
                                            <br />
                                            <span>Tuition Fee: {course.tuitionFee}</span>
                                            <br />
                                            <button disabled={actionStates[course._id].isActionConfirming} onClick={() => this.dropCourse(course)}>Drop Course</button>
                                            <br />
                                            {actionStates[course._id].isDropWindowOpen && (
                                                <DropCourse
                                                    term={term.term}
                                                    onConfirmDrop={() => this.confirmDrop(course.courseCode)} 
                                                    onCancelDrop={() => this.cancelDrop(course._id)} 
                                                    currentCourse={course}
                                                />
                                            )}
                                            <br />
                                        </div>
                                    ))
                                ) : (
                                    <p>No registered courses found in this term.</p>
                                )}
                                <hr />
                            </div>
                        ))
                    ) : (
                        <p>No registered courses found.</p>
                    )}
                </div>
            </div>
        );
    }
}


export default MyCourses;