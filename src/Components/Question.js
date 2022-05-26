//This is step-2 and important part of the quiz.
//Here the questions are rendered and quiz takes place.
//data is fetched from local storage

import React, { useState, useEffect, useRef } from "react";

const Question = ({
  data,
  onAnswerUpdate,
  numberOfQuestions,
  activeQuestion,
  onSetActiveQuestion,
  onSetStep,
}) => {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const radiosWrapper = useRef();
  const choices = [data.option1, data.option2, data.option3, data.option4];

  useEffect(() => {
    const findCheckedInput =
      radiosWrapper.current.querySelector("input:checked");
    if (findCheckedInput) {
      findCheckedInput.checked = false;
    }
  }, [data]);

  const changeHandler = (e) => {
    setSelected(e.target.value);
    if (error) {
      setError("");
    }
  };
  //when user clicks on next button this function is invoked and next question is rendered
  const nextClickHandler = (e) => {
    //an error is generated if no option is selected
    if (selected === "") {
      return setError("Please select one option!");
    }
    //when a option is selected
    onAnswerUpdate((prevState) => [
      ...prevState,
      { q: data.question, a: selected },
    ]);
    setSelected("");
    //this condion checks is the active question is last question
    if (activeQuestion < numberOfQuestions - 1) {
      onSetActiveQuestion(activeQuestion + 1);
    } else {
      //if it is last question step-3 i.e. score is invoked.
      onSetStep(3);
    }
  };

  return (
    <div className="" style={{ width: "18rem" , backgroundColor:"cyan" }}>
      <div className="">
        <div className="">
          <h2 className="mb-5">{data.question}</h2>
          <div className="d-flex flex-column" ref={radiosWrapper}>
            {/* choices are mapped using radiowrapper */}
            {choices.map((choice, i) => (
              <label className="bg-light" key={i}>
                <input
                  type="radio"
                  name="answer"
                  value={choice}
                  onChange={changeHandler}
                  className="mt-4"
                />
                {choice}
              </label>
            ))}
          </div>

          {/* in case of any errors */}
          {error && <div className=" mt-4 text-danger">{error}</div>}

          {/* Next question Button */}
          <div class="d-grid mt-4">
            <button
              className="btn btn-primary"
              type="button"
              onClick={nextClickHandler}
            >Next Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;