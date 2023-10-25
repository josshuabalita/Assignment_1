import React, { useState } from 'react';

function AddCourse({ onAddCourse, terms }) {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [tuitionFee, setTuitionFee] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [startMonthDay, setStartMonthDay] = useState('');
  const [endMonthDay, setEndMonthDay] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!courseName || !courseCode || !selectedTerm || !startMonthDay || !endMonthDay || !tuitionFee) {
      alert('Please fill in all required fields');
      return;
    }
    
    const formattedTuitionFee = tuitionFee.startsWith('$') ? tuitionFee : `$${tuitionFee}`;

    const newCourse = {
      courseName,
      courseCode,
      selectedTerm,
      startMonthDay,
      endMonthDay,
      tuitionFee: formattedTuitionFee, 
    };
    
    onAddCourse(newCourse);
    
    setCourseName('');
    setCourseCode('');
    setTuitionFee('');
    setSelectedTerm('');
    setStartMonthDay('');
    setEndMonthDay('');
  };

  return (
    <div>
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Course Name:
          <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
        </label>
        <label>
          Course Code:
          <input type="text" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} />
        </label>
        <label>
          Select Term:
          <select value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)}>
            <option value="">Select Term</option>
            {terms.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>
        </label>
        <label>
          Start Date(Month/Day):
          <input
            type="text"
            value={startMonthDay}
            onChange={(e) => setStartMonthDay(e.target.value)}
            placeholder="Month Day (e.g., January 5)"
          />
        </label> 
        <label>
          End Date(Month/Day):
          <input
            type="text"
            value={endMonthDay}
            onChange={(e) => setEndMonthDay(e.target.value)}
            placeholder="Month Day (e.g., May 2)"
          />
        </label>
        <label>
          Tuition Fee:
          <input
            type="text"
            value={tuitionFee}
            onChange={(e) => setTuitionFee(e.target.value)}
          />
        </label>
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
}

export default AddCourse;