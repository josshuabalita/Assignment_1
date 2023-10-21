import React, { Component } from 'react';
import TermCourses from './TermCourses';
import coursesData from './coursesData';
import TermSelection from './TermSelection';
import SearchCourses from './SearchCourses';
import RegisteredCourses from './RegisterdCourses';

class CourseRegistrationPage extends Component {
  state = {
    terms: Object.keys(coursesData),
    selectedTerm: '',
    searchTerm: '',
    registeredCourses: [],
    searchResults: [],
  };

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

    const filteredResults = this.state.terms.flatMap((term) => {
      const filteredCourses = coursesData[term].filter((course) =>
        course.courseCode.toLowerCase().includes(newSearchTerm.toLowerCase())
      );
      return filteredCourses.map((course) => ({ course, term }));
    });
    this.setState({ searchResults: filteredResults });
  };

  handleTermChange = (term) => {
    this.setState({ selectedTerm: term });
  };

  handleAddCourse = (course) => {
    const isAlreadyRegistered = this.state.registeredCourses.some(
      (regCourse) => regCourse.course.courseCode === course.courseCode && regCourse.term === this.state.selectedTerm
    );

    if (isAlreadyRegistered) {
      const existingCourse = this.state.registeredCourses.find(
        (regCourse) => regCourse.course.courseCode === course.courseCode && regCourse.term === this.state.selectedTerm
      );

      if (existingCourse.status === 'Failed') {
        this.setState((prevState) => ({
          registeredCourses: prevState.registeredCourses.map((regCourse) =>
            regCourse.course.courseCode === course.courseCode && regCourse.term === this.state.selectedTerm
              ? { ...regCourse, status: 'Registered' }
              : regCourse
          ),
        }));
      } else {
        alert('You are already registered for this course in the current term.');
      }
    } else {
      this.setState((prevState) => ({
        registeredCourses: [
          ...prevState.registeredCourses,
          { course, term: this.state.selectedTerm, status: 'Registered' },
        ],
      }));
    }
  };

  render() {
    const filteredCourses = this.state.selectedTerm ? coursesData[this.state.selectedTerm] : [];

    return (
      <div>
        <h1>Add Courses</h1>
        <SearchCourses onSearchChange={this.handleSearchChange} searchResults={this.state.searchResults} />
        <TermSelection terms={this.state.terms} selectedTerm={this.state.selectedTerm} onTermChange={this.handleTermChange} />
        <TermCourses
          term={this.state.selectedTerm}
          courses={filteredCourses}
          onAddCourse={this.handleAddCourse}
          termSelected={!!this.state.selectedTerm}
        />
        <br />
        <p>Registered Courses is just an example showing registered classes, will remove and update to another page once back-end is connected!</p>
        <RegisteredCourses
          registeredCourses={this.state.registeredCourses}
          onRemoveCourse={this.handleRemoveCourse}
        />
      </div>
    );
  }
}

export default CourseRegistrationPage;