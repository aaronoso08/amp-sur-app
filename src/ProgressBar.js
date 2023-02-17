import React from 'react';
import './ProgressBar.css';

const ProgressBar = (props) => {
  const { currentQuestion, totalQuestions } = props;
  const percentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${percentage}%` }} />
    </div>
  );
};

export default ProgressBar;