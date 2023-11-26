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
    fetch('http://localhost:8080/courses')
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

  handleAddCourse = (course) => {
    const isAlreadyRegistered = this.state.registeredCourses.some(
      (regCourse) =>
        regCourse.course.courseCode === course.courseCode &&
        regCourse.term === this.state.selectedTerm
    );

    if (isAlreadyRegistered) {
      const existingCourse = this.state.registeredCourses.find(
        (regCourse) =>
          regCourse.course.courseCode === course.courseCode &&
          regCourse.term === this.state.selectedTerm
      );

      if (existingCourse.status === 'Failed') {
        this.setState((prevState) => ({
          registeredCourses: prevState.registeredCourses.map((regCourse) =>
            regCourse.course.courseCode === course.courseCode &&
            regCourse.term === this.state.selectedTerm
              ? { ...regCourse, status: 'Registered' }
              : regCourse
          ),
          registrationMessage: '', 
        }));
      } else {
        this.setState({
          registrationMessage:
            'You are already registered for this course in the current term.',
        });
      }
    } else {
      this.setState((prevState) => ({
        registeredCourses: [
          ...prevState.registeredCourses,
          { course, term: this.state.selectedTerm, status: 'Registered' },
        ],
        registrationMessage: '', 
      }));
    }
  };

  render() {
    const { courses, selectedTerm } = this.state;
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
        </div>
      </div>
    );
  }
}

export default CourseRegistrationPage;