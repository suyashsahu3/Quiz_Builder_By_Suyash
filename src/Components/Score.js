//This is the final step in quiz here the score is displayed.
//after quiz is finished the score is calculated and result is displayed.
//a user can also re attempt the quiz


import React, { useEffect, useState } from "react";

const Score = ({ results, data, onReset}) => {
  //setting state for correct answers
  const [correctAnswers, setCorrectAnswers] = useState(0);

  //checking if selected option matched the correct answer provided by user
  useEffect(() => {
    let correct = 0;
    results.forEach((result, index) => {
      if (result.a === data[index].answer) {
        //incrementing correct variable when the condition is true
        correct++;
      }
    });
    setCorrectAnswers(correct);
  }, []);

  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <div className="content">
          <h3>Your results</h3>
          <p>
            {correctAnswers} of {data.length}
          </p>
          <p>
            {/* calculating the percentage */}
            <p className="fw-bold">{Math.floor((correctAnswers / data.length) * 100)}%</p>
          </p>
          {/* A button for re-attempting the quiz */}
          <button className="btn btn-success mt-4" onClick={onReset}>
            Try again
          </button>
        </div>
      </div>
      thank you for taking the quiz!
    </div>
  );
};

export default Score;