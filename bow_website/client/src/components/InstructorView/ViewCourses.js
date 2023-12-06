import React, { Component } from 'react';
import AddCourse from './AddACourse';
import DropCourse from '../StudentView/MyCoursesPage/DropCourse';
import SearchCourses from '../StudentView/AddCoursesPage/SearchCourses';
import "./ViewCourses.css";
import styles from '../StudentView/AddCoursesPage/addCourseStyle.module.css';

class ViewCourses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      dropCourseIndex: null,
      coursesToDelete: {},
      searchResults: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/courses', {
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ courses: data });
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }

  handleAddCourse = async (newCourse) => {
    try {
      const response = await fetch('http://localhost:8080/add-new-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourse),
        credentials: 'include'
      });
  
      if (!response.ok) {
        throw new Error('Failed to add course');
      }
  
      console.log('Course added successfully');
      window.location.reload(); 
    } catch (error) {
      console.error('Error adding course:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };
  
  handleDeleteCourse = (courseCode, term) => {
    this.setState((prevState) => {
      const { coursesToDelete } = prevState;
      coursesToDelete[term] = courseCode;
      return { coursesToDelete };
    });
  };

  handleConfirmDrop = async (courseCode) => {
    try {
      const response = await fetch(`http://localhost:8080/courses/${courseCode}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete course');
      }
  
      console.log(data.message); 
      
      window.location.reload(); 

    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  handleCancelDrop = () => {
    this.setState({ coursesToDelete: {} });
  };

  handleSearchChange = (newSearchTerm) => {
    this.setState({ searchTerm: newSearchTerm });
  
    if (newSearchTerm === '') {
      this.setState({ searchResults: [] });
      return;
    }
  
    const { courses } = this.state;
  
    const filteredResults = courses.flatMap((termData) => {
      const filteredCourses = termData.courses.filter((course) =>
        course.courseCode.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
        course.courseName.toLowerCase().includes(newSearchTerm.toLowerCase())
      );
      return filteredCourses.map((course) => ({ course, term: termData.term }));
    });
  
    this.setState({ searchResults: filteredResults });
  };

  render() {
    const { courses, coursesToDelete } = this.state;

    return (
      <div className="view-courses-container">
        <h1 className='view'>Add New Courses</h1>
        <div className={styles.containerCourses}>
          <AddCourse onAddCourse={this.handleAddCourse} terms={courses.map((termData) => termData.term)} />
          <hr />
          <SearchCourses onSearchChange={this.handleSearchChange} searchResults={this.state.searchResults} />
          <div className="course-list">
          {courses.map((termData, index) => (
              <div key={index}>
                <hr />
                <h2 className='term'>{termData.term}</h2>
                <div className="courses-container">
                  {termData.courses.map((course, courseIndex) => (
                    <div className="course" key={courseIndex}>
                      <h3>{course.courseName}</h3>
                      <p>
                        Course Code: {course.courseCode}<br />
                        Start Date: {course.startDate || 'N/A'}<br />
                        End Date: {course.endDate || 'N/A'}<br />
                        Tuition Fee: {course.tuitionFee}
                      </p>
                      <button onClick={() => this.handleDeleteCourse(course.courseCode, termData.term)}>
                        Delete Course
                      </button>
                      {coursesToDelete[termData.term] === course.courseCode && (
                        <DropCourse
                        term={termData.term}
                        currentCourse={course.courseCode}
                        onConfirmDrop={() => this.handleConfirmDrop(course.courseCode, termData.term)}
                        onCancelDrop={this.handleCancelDrop}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}


export default ViewCourses;