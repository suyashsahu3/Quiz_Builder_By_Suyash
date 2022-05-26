//This page can be used to create a quiz
//user have to fill the details and add questions.
// currently only single-type questions are supported
//The quiz object uses the user mail and adds the quiz title for creating a unique quiz object in local storage.

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import QueInput_bg from "./assets/que_bg.jpg";
import { Link , useNavigate } from "react-router-dom";

const QuestionInput = () => {
  const location = useLocation();
  const navigate = useNavigate();
  //setting intial values
  const [question, setQuestion] = useState({
    title: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  });

  const [isAdded, setIsAdded] = useState(false);

  const [addQuestionDetails, setAddQuestionDetails] = useState([]);

  //This event is triggred when a user start entering quiz details
  const inputEvent = (event) => {
    const { name, value } = event.target;
    setQuestion((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
    setIsAdded(false);
  };

  const addEvent = (e) => {
    setAddQuestionDetails((prevData) => {
      return [...prevData, question];
    });
    setIsAdded(true);

    //resetting the form after a question is added
    let form = document.getElementById('form');
    form.reset();
  };

  //when make quiz is clicked this function saves the quiz into local storage
  const addTOStorage = () => {
    //useremail and title is set as object in local storage
    localStorage.setItem(
      location.state.user + `${question.title}`,
      JSON.stringify(addQuestionDetails)
    );
    alert("Quiz Mapped succesfully you can view the quiz from home page.");
    setAddQuestionDetails([]);
  };

  const home = () => {
    navigate("/UserHome");
  }

  return (
    <>
      <div className="" style={{ backgroundImage : `url(${QueInput_bg})` , height:"100vh" }}>
        <div>
          <button className="btn btn-primary rounded-pill m-2 float-end" onClick={home}> Home Page
          </button>
          <button className="btn btn-primary text-center rounded-pill m-2">
            <Link to={`/UserHome/ViewQuiz`} state={{ user: location.state.email }} >
              <span className="text-white">Show my Quizzes</span>
            </Link>
          </button>
        </div>
        <br></br>
        <div className=" text-white text-center  h2">
          Enter Quiz Details
        </div>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6 bg-light opacity-75 rounded mb-3">

            {/* Message appears when a question is added in quiz */}
            {isAdded ? (
              <h5 className="h2">Question is Mapped!</h5>
            ) : null}

            {/* form for quiz details */}
            <form className="mt-4" id="form">
              <div className="row">
                <label
                  htmlFor="quiz_title"
                  className="form-check-label col-4 h5"
                >
                  Enter Quiz Title :
                </label>
                <input
                  type="text"
                  id="quiz_title"
                  name="title"
                  value={question.title}
                  onChange={inputEvent}
                  className="col-6"
                  placeholder="Enter Quiz Title Here..."
                ></input>
              </div>
              <div className="row mt-3">
                <label htmlFor="question" className="col-4 h5">
                  Enter Question :
                </label>
                <textarea
                  rows=""
                  id="question"
                  name="question"
                  columns=""
                  value={question.question}
                  className="form-text col-6"
                  placeholder="Write a Question"
                  onChange={inputEvent}
                />
                <div className="form-group">
                  <div>
                    <label className="col-4">Option-1 :</label>
                    <input
                      placeholder="option1"
                      name="option1"
                      className="mt-3 col-6"
                      type="text"
                      value={question.option1}
                      onChange={inputEvent}
                    />
                  </div>
                  <div>
                    <label className="col-4">Option-2 :</label>
                    <input
                      placeholder="option2"
                      name="option2"
                      className="mt-3 col-6"
                      type="text"
                      value={question.option2}
                      onChange={inputEvent}
                    />
                  </div>
                  <div>
                    <label className="col-4">Option-3 :</label>
                    <input
                      placeholder="option3"
                      name="option3"
                      className="mt-3 col-6"
                      type="text"
                      value={question.option3}
                      onChange={inputEvent}
                    />
                  </div>
                  <div>
                    <label className="col-4">Option-4 :</label>
                    <input
                      placeholder="option4"
                      name="option4"
                      className="mt-3 col-6"
                      type="text"
                      value={question.option4}
                      onChange={inputEvent}
                    />
                  </div>
                  <div>
                    <label className="col-4">Correct Option:</label>
                    <input
                      placeholder="correct Option"
                      name="answer"
                      className="mt-3 col-6"
                      type="text"
                      value={question.answer}
                      onChange={inputEvent}
                    />
                  </div>
                </div>
                <div className="row my-4 mx-1">
                  <div
                      type="submit"
                      onClick={addEvent}
                      className="btn btn-primary col me-1"
                    >
                      Add Question
                  </div>
                  <div
                      type="submit"
                      className="btn btn-primary col ms-1"
                      onClick={addTOStorage}
                    >
                      Make Quiz
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    </>
  );
};

export default QuestionInput;