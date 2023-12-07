import React, { Component } from 'react';
import TermCourses from './TermCourses';
import TermSelection from './TermSelection';
import SearchCourses from './SearchCourses';
import RegisteredCourses from './RegisterdCourses';
import styles from './addCourseStyle.module.css';

class CourseRegistrationPage extends Component {
  state = {
    terms: [],
    selectedTerm: '',
    searchTerm: '',
    registeredCourses: [],
    searchResults: [],
    registrationMessage: '', 
    courses: [], 
  };

  componentDidMount() {
    fetch('http://localhost:8080/courses', {
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((data) => {
        const terms = data.map((termData) => termData.term); 
        this.setState({ 
          courses: data, 
          terms: terms,
        });
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
    
  }

  handleRemoveCourse = (courseToRemove) => {
    this.setState((prevState) => ({
      registeredCourses: prevState.registeredCourses.filter(
        (course) => course !== courseToRemove
      ),
    }));
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

  handleTermChange = (term) => {
    const { courses } = this.state;
    const selectedTerm = courses.find((course) => course.term === term);
    const filteredCourses = selectedTerm ? selectedTerm.courses : [];
    
    this.setState({
      selectedTerm: term,
      filteredCourses: filteredCourses,
    });
  };

  handleAddCourse = async (course) => {
    const { selectedTerm } = this.state;
  
    if (!selectedTerm) {
      console.error('Please select a term before adding a course.');
      const errorDiv = document.getElementById('registrationMessage');
      if (errorDiv) {
        errorDiv.textContent = 'Please select a term before adding a course.';
      }
      return;
    }
  
    try {
      const courseToAdd = {
        ...course,
        term: selectedTerm,
      };
  
      const response = await fetch('http://localhost:8080/courses/student/added-courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseToAdd),
        credentials: 'include', 
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        const errorDiv = document.getElementById('registrationMessage');
        if (errorDiv) {
          errorDiv.textContent = responseData.message || 'Failed to add course';
        }
        throw new Error(responseData.message || 'Failed to add course');
      }
  
      const successDiv = document.getElementById('registrationMessage');
      if (successDiv) {
        successDiv.textContent = responseData.message;
      }
  
    } catch (error) {
      console.error('Error adding course:', error.message);
    }
  };

  render() {
    const { courses, selectedTerm, registrationMessage } = this.state;
    const filteredCourses = selectedTerm ? courses.filter(course => course.term === selectedTerm) : [];

    return (
      <div className={styles.container}>
        <h1 className={styles.h1}>Add Courses</h1>
        <div className={styles.containerCourses}>
          <SearchCourses
            onSearchChange={this.handleSearchChange}
            searchResults={this.state.searchResults}
          />
          <hr />
          <TermSelection
            terms={this.state.terms}
            selectedTerm={this.state.selectedTerm}
            onTermChange={this.handleTermChange}
          />

          <TermCourses
            term={this.state.selectedTerm}
            courses={this.state.filteredCourses} 
            onAddCourse={this.handleAddCourse} 
            termSelected={!!this.state.selectedTerm}
            registrationMessage={this.state.registrationMessage}
          />
        <p id="registrationMessage" className={styles.errorMessage}>{registrationMessage}</p>
        </div>
      </div>
    );
  }
}

export default CourseRegistrationPage;