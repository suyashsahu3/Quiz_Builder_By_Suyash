//This is where the quiz takes place in 3 steps.
//when start button is clicked step-1 is triggered and so on.

import React from "react";
import QuizBegin from "./QuizBegin";
import { useLocation } from "react-router-dom";
import Question from "./Question";
import Score from "./Score";
import { useState, useEffect } from "react";

const VisitQuiz = () => {

  const location = useLocation();

  const quizData = location.state.arr;

  const [step, setStep] = useState(1);

  const [activeQuestion, setActiveQuestion] = useState(0);

  const [answers, setAnswers] = useState([]);

  const quizStartHandler = () => {
    setStep(2);
  };

  const resetClickHandler = () => {
    setActiveQuestion(0);
    setAnswers([]);
    setStep(2);

  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">

      {/* in step-1 a component QuizBegin is called and the quiz is started */}
      {step === 1 && <QuizBegin onQuizStart={quizStartHandler} />}
      {/* in step-2 question are displayed user can select the options and component Question is triggered */}
      {step === 2 && (
        <Question
          data={quizData[activeQuestion]}
          onAnswerUpdate={setAnswers}
          numberOfQuestions={quizData.length}
          activeQuestion={activeQuestion}
          onSetActiveQuestion={setActiveQuestion}
          onSetStep={setStep}
        />
      )}
      {/* in step-3 when quiz is finished the score is eveluated and displayed to the user */}
      {step === 3 && (
        <Score
          results={answers}
          data={quizData}
          onReset={resetClickHandler}
        />
      )}
    </div>
  );
};

export default VisitQuiz;