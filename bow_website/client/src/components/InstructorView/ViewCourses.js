import React, { Component } from 'react';
import AddCourse from './AddACourse';
import coursesData from '../StudentView/AddCoursesPage/coursesData';
import DropCourse from '../StudentView/MyCoursesPage/DropCourse';
import SearchCourses from '../StudentView/AddCoursesPage/SearchCourses';
import "./ViewCourses.css";
import styles from '../StudentView/AddCoursesPage/addCourseStyle.module.css';

class ViewCourses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: coursesData,
      coursesToDelete: {},
      searchResults: [],
    };
  }

  handleAddCourse = (newCourse) => {
    this.setState((prevState) => {
      const { courses } = prevState;
      const selectedTerm = newCourse.selectedTerm;

      const updatedCourses = {
        ...courses,
        [selectedTerm]: [...(courses[selectedTerm] || []), newCourse],
      };

      return { courses: updatedCourses };
    });
  };

  handleDeleteCourse = (courseCode, term) => {
    this.setState((prevState) => {
      const { coursesToDelete } = prevState;
      coursesToDelete[term] = courseCode;
      return { coursesToDelete };
    });
  };

  handleConfirmDrop = (term) => {
    this.setState((prevState) => {
      const { courses } = prevState;
      const { coursesToDelete } = prevState;
      const courseCode = coursesToDelete[term];

      if (!courseCode) {
        return {};
      }

      const updatedCourses = { ...courses };
      const termCourses = updatedCourses[term] || [];
      const updatedTermCourses = termCourses.filter((course) => course.courseCode !== courseCode);
      updatedCourses[term] = updatedTermCourses;

      return { courses: updatedCourses, coursesToDelete: {} };
    });
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

    const filteredResults = Object.keys(coursesData).flatMap((term) => {
      const filteredCourses = coursesData[term].filter((course) =>
        course.courseCode.toLowerCase().includes(newSearchTerm.toLowerCase())
      );
      return filteredCourses.map((course) => ({ course, term }));
    });
    this.setState({ searchResults: filteredResults });
  };

  render() {
    const { courses, coursesToDelete } = this.state;

    return (
      <div className="view-courses-container">
        <h1 className='view'>Add New Courses</h1>
        <div className={styles.containerCourses}>
          <AddCourse onAddCourse={this.handleAddCourse} terms={Object.keys(courses)} />
          <hr />
          <SearchCourses onSearchChange={this.handleSearchChange} searchResults={this.state.searchResults} />
          <div className="course-list">
            {Object.entries(courses).map(([term, termCourses]) => (
              <div key={term}>
                <hr />
                <h2 className='term'>{term}</h2>
                <div className="courses-container">
                  {termCourses.map((course) => (
                    <div className="course" key={course.courseCode}>
                      <h3>{course.courseName}</h3>
                      <p>
                        Course Code: {course.courseCode}<br />
                        Start Date: {this.getCourseStartDate(course.courseCode, term) || 'N/A'}<br />
                        End Date: {this.getCourseEndDate(course.courseCode, term) || 'N/A'}<br />
                        Tuition Fee: {course.tuitionFee}
                      </p>
                      <button onClick={() => this.handleDeleteCourse(course.courseCode, term)}>
                        Delete Course
                      </button>
                      {coursesToDelete[term] === course.courseCode && (
                        <DropCourse
                          term={term}
                          currentCourse={course}
                          onConfirmDrop={() => this.handleConfirmDrop(term)}
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

  getCourseStartDate = (courseCode, term) => {
    const termCourses = this.state.courses[term] || [];
    const course = termCourses.find((c) => c.courseCode === courseCode);
    return course && course.startMonthDay ? course.startMonthDay : coursesData[term][0].startDate || 'N/A';
  };

  getCourseEndDate = (courseCode, term) => {
    const termCourses = this.state.courses[term] || [];
    const course = termCourses.find((c) => c.courseCode === courseCode);
    return course && course.endMonthDay ? course.endMonthDay : coursesData[term][0].endDate || 'N/A';
  };
}

export default ViewCourses;