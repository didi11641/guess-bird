import React from 'react';
import './HintButton.css';

const HintButton = ({ hint, hideHint }) => {
  return (
    <div className="hint-button">
      <button onClick={hideHint}>{hint}</button>
    </div>
  );
};

export default HintButton;