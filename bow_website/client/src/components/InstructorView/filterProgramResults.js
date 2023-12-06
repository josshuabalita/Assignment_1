import React from 'react';

function ProgramFilter({ program, handleProgramFilterChange }) {
  return (
    <div className="program-filter">
      <label htmlFor="program-filter">Filter by Program:</label>
      <select id="program-filter" value={program} onChange={handleProgramFilterChange}>
        <option value="all">All Programs</option>
        <option value="Post-Diploma">Post Diploma</option>
        <option value="Diploma">Diploma</option>
        <option value="Certificate">Certificate</option>
      </select>
    </div>
  );
}

export default ProgramFilter;