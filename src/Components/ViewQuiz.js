//This page shows the quiz published by the user.
//from here user can start a particular quiz or delete a quiz.

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link , useNavigate } from "react-router-dom";
import viewQuiz_bg from "./assets/viewQuiz_bg.jpg"

const ViewQuiz = () => {
  const location = useLocation();

  //keyArr is key of the quiz object
  const keyArr = Object.keys(localStorage);
  const user = location.state.user;
  // const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  //Delete function for deleting a quiz
  const Delete = () => {
    alert("quiz deleted!!! please refresh page to see updated list");
    {keyArr.map((obj, i) => {
      if (obj.includes(user)) {
        JSON.parse(localStorage.removeItem(obj));
      }
    })}
  }
  const home = () => {
    navigate("/UserHome");
  }

  return (
    <div className="p-5 pt-1" style={{ backgroundImage : `url(${viewQuiz_bg})` }}>
      <div>
        <button className="btn btn-primary rounded-pill m-2 float-end" onClick={home}> Home Page
        </button>
        <button className="btn btn-primary text-center rounded-pill m-2">
          <Link to={`/UserHome/QuestionInput`}
            state={{ user: location.state.email }}
          >
            <span className="text-white">Create Quiz</span>
          </Link>
        </button>
      </div>
      <br></br>

      {/* Rendering all the quiz from local storage by map function using key as KeyArr */}
      {keyArr.map((obj, i) => {
        if (obj.includes(user)) {
          const arr = JSON.parse(localStorage.getItem(obj));
          const title = obj.substring(user.length);
          return (
            <div className="container">
              <div className="card bg-dark m-3 rounded" style={{ width: "25rem" }}>
                <div className="card-body text-white">
                  <h5 className="card-title m-2">{title}</h5>

                  {/* permalink of a quiz is same as object in local storage */}
                  <p>permalink of Quiz is : {user+title}</p>

                  {/* Button for starting the quiz */}
                  <button className="btn btn-primary me-1">
                    <Link to={`/UserHome/ViewQuiz/VisitQuiz`} state={{ arr }}>
                      <span className="text-white">Start Quiz</span>
                    </Link>
                  </button>

                  {/* Button for deleting the quiz */}
                  <button className="btn btn-primary ms-1" onClick={Delete}>
                    Delete Quiz
                  </button>

                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ViewQuiz;