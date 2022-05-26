//This is the Home page of User here Unique data of each user can be accessed.
//From this page a user can go to create quiz and view quiz page.
//User can also visit a quiz by entering permalink also.

import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import userhome_bg from "./assets/userhome_bg.jpg";
import { useState } from "react";

function UserHome() {
  const navigate = useNavigate();
  const location = useLocation();
  //setting login state to true
  const [isLogin, setIsLogin] = useState(true);
  //logout function
  const logout = () => {
    sessionStorage.removeItem("userInfo");
    setIsLogin(false);
  };
  return (
    <>
      {!isLogin ? (
        //if a user is not logged in then it will be redirected to login page
        navigate("/Login")
      ) : (
        <div
          className="bg-image bg-co"
          style={{
            backgroundImage: `url(${userhome_bg})`,
            height: "100vh",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          >
          <div>
            <button className="btn btn-light rounded-pill m-2 float-end" onClick={logout}>
              Logout
            </button>
          </div>
          <br></br>
          <div className="row ms-5">
            <div className="col bg-light mt-5" style={{opacity:"90%"}} >
              <div className="fw-bold fs-3 text-center">
                Welcome to Quiz Builder Application.
                Here you can create and view your quizes.
              </div>
              <div className="d-flex flex-column justify-content-center my-4" >
                <button className="btn btn-primary">
                  <Link to={`/UserHome/QuestionInput`}
                    state={{ user: location.state.email }}
                    >
                    <span className="text-white ">Create Quiz</span>
                  </Link>
                </button>
                <br />
                <button className="btn btn-primary text-center">
                  <Link to={`/UserHome/ViewQuiz`}
                    state={{ user: location.state.email }}
                    >
                    <span className="text-white">Show my Quizzes</span>
                  </Link>
                </button>
              </div>
            </div>
            <div className="col bg-light text-center opacity-75 mt-5">
              <div className="">
                <label className="form-label fw-bold h3">Enter Permalink of Quiz</label>
                <input className="form-control" id="QuizLink" placeholder="Enter Permalink"></input>
              </div>
              <button className="btn btn-primary m-3 rounded-pill">
                <Link to={`/UserHome/ViewQuiz/VisitQuiz`} state={{}}>
                  <span className="text-white">Start Quiz</span>
                </Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserHome;