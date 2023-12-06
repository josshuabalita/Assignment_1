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
          fetch('http://localhost:8080/courses/student/registered', {
            credentials: 'include', 
          })
            .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            if (!data || !data.coursesByTerm || data.coursesByTerm.length === 0) {
              throw new Error('No registered courses found');
            }
    
            const initialActionStates = {};
            data.coursesByTerm.forEach((termObj) => {
              termObj.courses.forEach((course) => {
                initialActionStates[course._id] = {
                  isChangeWindowOpen: false,
                  isDropWindowOpen: false,
                  isActionConfirming: false,
                };
              });
            });
    
            this.setState({
              registeredCourses: data.coursesByTerm || [], 
              actionStates: initialActionStates,
            });
          })
          .catch((error) => {
            console.error('Error fetching registered courses:', error);
          });
      }

      dropCourse = (course) => {
        const { actionStates } = this.state;
      
        if (actionStates[course._id]?.isActionConfirming) {
          return;
        }
      
        this.setState((prevState) => ({
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
          const response = await fetch(
            `http://localhost:8080/courses/student/registered/${courseCode}`,
            {
              method: 'DELETE',
              credentials: 'include', 
            }
          );
      
          if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.message || 'Failed to delete course');
          }
      
          // Update the action state for the current course being dropped
          this.setState((prevState) => ({
            currentCourse: null,
            actionStates: {
              ...prevState.actionStates,
              [prevState.currentCourse._id]: {
                ...prevState.actionStates[prevState.currentCourse._id],
                isDropWindowOpen: false,
                isActionConfirming: false,
              },
            },
          }));
      
          window.location.reload();
        } catch (error) {
          console.error('Error deleting course:', error);
        }
      };

      cancelDrop = () => {
        this.setState((prevState) => ({
          actionStates: {
            ...prevState.actionStates,
            [prevState.currentCourse._id]: {
              ...prevState.actionStates[prevState.currentCourse._id],
              isDropWindowOpen: false,
              isActionConfirming: false,
            },
          },
        }));
      };

      render() {
        const { registeredCourses, actionStates } = this.state;
      
        return (
          <div>
            <h1>My Courses</h1>
            <div className={styles.containerCourses}>
              {registeredCourses.length > 0 ? (
                registeredCourses.map((termObj) => (
                  <div key={termObj._id}>
                    <h2>{termObj.term}</h2>
                    {termObj.courses.length > 0 ? (
                      termObj.courses.map((course) => (
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
                          <button
                            disabled={actionStates[course._id]?.isActionConfirming}
                            onClick={() => this.dropCourse(course)}
                          >
                            Drop Course
                          </button>
                          <br />
                          {actionStates[course._id]?.isDropWindowOpen && (
                            <DropCourse
                              term={termObj.term}
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