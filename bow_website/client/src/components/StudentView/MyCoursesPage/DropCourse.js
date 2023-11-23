import React from 'react';

const DropCourse = ({ term, currentCourse, onConfirmDrop, onCancelDrop }) => {
    function handleConfirmDrop() {
        onConfirmDrop();
    }

    return (
        <div>
            <h3>Do you want to drop the current course for {term}?</h3>
            <button onClick={handleConfirmDrop}>Confirm Drop</button>
            <button onClick={onCancelDrop}>Cancel</button>
        </div>
    );
};

export default DropCourse;