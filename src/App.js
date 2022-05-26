import React from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Register from "./Components/Register";
import Login from "./Components/Login";
import UserHome from "./Components/UserHome";
import QuestionInput from "./Components/QuestionInput";
import ViewQuiz from "./Components/ViewQuiz";
import VisitQuiz from "./Components/VisitQuiz";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    //Setting Browser Routes for Components
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/UserHome" element={<UserHome />} />
        <Route path="/UserHome/QuestionInput" element={<QuestionInput />} />
        <Route path="/UserHome/ViewQuiz" element={<ViewQuiz />} />
        <Route path="/UserHome/ViewQuiz/VisitQuiz" element={<VisitQuiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;