// This is the Landing page of the application. Here user can login with their credentials.
// A link for registration page is also provided at the bottom of login form.



import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import background from "./assets/home_bg.jpg";
import { useNavigate, Link } from "react-router-dom";


function Login() {
  const navigate = useNavigate();

  //Initializing the values of userdata
  const initialValues = {
    email: "",
    password: "",
  };

  const [loggedIn, setLoggedIn] = useState(false);
  const [isCorrect, setIsCorrect] = useState(true);

  const validationSchema = yup.object({
    email: yup.string().email("Invalid email format").required("Email is Required!"),
    password: yup.string().required("Password is Required!"),
  });
  const onSubmit = (values) => {};
  //Using useFormik hook for form validation
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  //handling the form submit
  function handleFormSubmit(e) {
    formik.handleSubmit(e);
    var arr = JSON.parse(localStorage.getItem("UserData"));
    if (arr === null) {
      setIsCorrect(!isCorrect);
    } 
    else if (
      arr.some(
        (user) =>
          user.email === formik.values.email &&
          user.password === formik.values.password
        ))
    {
      let ob = { email: formik.values.email, password: formik.values.password };
      sessionStorage.setItem("userInfo", JSON.stringify(ob));
      setLoggedIn(true);
      //after authentication user is directed to the User Home page.
      navigate("/UserHome", { state: { email: formik.values.email } });
    } 
    else 
    {
      setIsCorrect(!isCorrect);
    }
  }
  return (
    <div style={{ backgroundImage: `url(${background})` , backgroundSize:"cover", height: "100vh" }}>
      
      <div className="container row ">
        <p className="h2 text-white text-center ">Welcome to Quiz Builder Application By- Suyash Sahu...</p>
        <div className="col-md-6" style={{ marginTop: "10px" }}>
          <div className="mb-2 text-center">
            <p className="h3 text-white text-center opacity-75">Login to your Profile to Begin.</p>
          </div>
          {/* login form for entering details */}
          <form onSubmit={handleFormSubmit}>
            <div className="form-control bg-muted opacity-75">
              <label htmlFor="email" className="form-label fw-bold ">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control bg-light mb-2"
                placeholder="Enter Your Email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
              ></input>
              <div className="error text-danger mb-2">
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </div>
              <label htmlFor="password" className="form-label fw-bold ">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control mb-2 bg-light "
                placeholder="Enter Your Password "
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
              ></input>
              <div className="form-error text-danger mt-0">
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </div>

              <div className=" my-3">
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg  col-12">
                    Login
                  </button>
                </div>
              </div>
              {isCorrect ? (
                <div></div>
              ) : (
                <div className="text-danger">
                  Username or password is incorrect
                </div>
              )}
            </div>
          </form>
          {/* Registration Page Link */}
          <div>
            <p className="h5 text-white mt-2">Don't have an Account ?</p>
            <Link to="/Register">
              <button className="btn btn-primary rounded-pill btn-lg opacity-75">
                SignUp Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;