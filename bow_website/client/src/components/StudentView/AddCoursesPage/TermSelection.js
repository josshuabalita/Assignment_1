import React from "react";

const TermSelection = ({ terms, selectedTerm, onTermChange }) => {
  return (
    <div>
      <label>Select Term:</label>
      <select value={selectedTerm} onChange={(e) => onTermChange(e.target.value)}>
        <option value="">Select a term</option>
        {terms.map((term, index) => (
          <option key={index} value={term}>
            {term}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TermSelection;