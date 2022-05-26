//this is the step-1 of the quiz.
//this takes the user to a page and asked to start the quiz and quiz data is loaded.

import React from "react";

const QuizBegin = ({ onQuizStart }) => {
  return (
    <div className="bg-dark m-5 p-5">
      <div className="text-center h2">
        <p className="text-white">Click on Start button to Start the Quiz</p>
        <button className="btn btn-primary rounded-pill p-3" onClick={onQuizStart}>
          Start
        </button>
      </div>
    </div>
  );
};

export default QuizBegin;