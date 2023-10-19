import React, { useState } from 'react';
import TermCourses from './TermCourses';
import coursesData from './coursesData';
import TermSelection from './TermSelection';
import SearchCourses from './SearchCourses';
import RegisteredCourses from './RegisteredCourses';

const AddCoursePage = () => {
  const terms = Object.keys(coursesData);
  const [selectedTerm, setSelectedTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);

    if (newSearchTerm === '') {
      setSearchResults([]); // Reset search results when the search bar is empty
      return;
    }

    // Filter courses and determine the matching term for search results
    const filteredResults = terms.flatMap((term) => {
      const filteredCourses = coursesData[term].filter((course) =>
        course.courseCode.toLowerCase().includes(newSearchTerm.toLowerCase())
      );
      return filteredCourses.map((course) => ({ course, term }));
    });
    setSearchResults(filteredResults);
  };

  const handleTermChange = (term) => {
    setSelectedTerm(term);
  };

  const handleAddCourse = (course) => {
    setRegisteredCourses((prevCourses) => [...prevCourses, course]);
  };

  const handleRemoveCourse = (course) => {
    setRegisteredCourses((prevCourses) => prevCourses.filter((c) => c !== course));
  };

  const filteredCourses = selectedTerm ? coursesData[selectedTerm] : [];

  return (
    <div>
      <h1>Add Courses</h1>
      <SearchCourses onSearchChange={handleSearchChange} searchResults={searchResults} />
      <TermSelection terms={terms} selectedTerm={selectedTerm} onTermChange={handleTermChange} />
      <TermCourses term={selectedTerm} courses={filteredCourses} onAddCourse={handleAddCourse} termSelected={!!selectedTerm} />

      <RegisteredCourses
        registeredCourses={registeredCourses}
        onRemoveCourse={handleRemoveCourse}
      />
    </div>
  );
}

export default AddCoursePage;
