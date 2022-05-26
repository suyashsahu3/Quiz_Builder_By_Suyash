//This page is for setting up a user account.
//after entering the details all the data is stored in local storage and user is redirected to login page.

import React, { useState } from "react";
import { useFormik } from "formik";
import register_bg from "./assets/register_bg.jpg";
import * as yup from "yup";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"


function Register() {
    const navigate = useNavigate();

    const [flag, setFlag] = useState(false);

    const [login, setLogin] = useState(true);

    const [isAlreadyExist, setIsAlreadyExist] = useState(false);

    //providing intial values of the form
    const initialValues = {
        email: "",
        password: "",
        name: "",
    };
    const onSubmit = (values) => {
    };

    //validation for user input and error for invalid input using yup.

    const validationSchema = yup.object({
        name: yup.string().required("Required!"),
        email: yup.string().email("Invalid email format").required("Required!"),
        password: yup
            .string()
            .required("Required!")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain atleast 8 Characters with One Uppercase, One Lowercase, One Numeric and one special character"
            ),
    });

    //Using useFormik hook for form validation
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    function handleFormSubmit(e) {
        formik.handleSubmit(e);
        if (!formik.values.email || !formik.values.password || !formik.values.name) {
            setFlag(true);
        } else {
            setFlag(false);
            let ob = {
                name: formik.values.name,
                email: formik.values.email,
                password: formik.values.password,
            }
            let olddata = localStorage.getItem('UserData');
            if (olddata == null) {
                olddata = []
                olddata.push(ob)
                localStorage.setItem('UserData', JSON.stringify(olddata));
            } else { 
            //if the data input by user already exist in the local storage then this function will generate an error
                let oldArr = JSON.parse(olddata)
                if (
                    oldArr.some(
                        (user) =>
                            user.email === formik.values.email
                    )
                ) {
                    setIsAlreadyExist(!isAlreadyExist);
                }
                else {
                    oldArr.push(ob)
                    localStorage.setItem("UserData", JSON.stringify(oldArr))
                    console.log(oldArr, 'Registered');
                    alert("Registered Succesfully!!! Please Login Now");
                    //navigating to login page after succesful registration
                    navigate("/login")
                }
            }
        }
        console.log(isAlreadyExist);
    }

    return (
        <div className="row bg-light">
            <div className="col-8">
                <img src={register_bg} alt="registeration background" style={{width:"65vw" , height: "100vh" }}></img>
            </div>
            <div className="col-4" style={{ marginTop: "30px" }}>
                <div className="mb-3">
                    <p className="h2 text-center">Sign Up for Quiz Builder Application</p>
                    <p className="h6 opacity-50">Enter Your Details...</p>
                </div>

                {/* Registration form */}

                <form onSubmit={handleFormSubmit} >
                    <div className="form-control bg-dark">
                        <label htmlFor="name" className="form-label fw-bold opacity-75">Name</label>
                        <input
                            type="string"
                            id="name"
                            name="name"
                            className="form-control bg-light mb-1"
                            placeholder="Enter Your Name"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        ></input>
                        <div className="error text-danger">
                            {formik.touched.name && formik.errors.name ? (
                                <div>{formik.errors.name}</div>
                            ) : null}
                        </div>
                        <label htmlFor="email" className="form-label fw-bold opacity-75">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control bg-light mb-1"
                            placeholder="Enter Your Email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        ></input>
                        <div className="error text-danger">
                            {formik.touched.email && formik.errors.email ? (
                                <div>{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <label htmlFor="password" className="form-label fw-bold opacity-75">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control mb-1 bg-light "
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
                                <button type="submit" className="btn btn-primary btn-lg">Register</button>
                            </div>
                        </div>
                        {isAlreadyExist ? <div className="text-danger text-center"> This User already Exists in the Database continue to Login. </div> : null}
                    </div>
                </form>
                {/* Link for Login Page */}
                <div className="my-2">
                    <span className="h6 opacity-75 text-center">Already Registered!!!</span>
                    <Link to="/Login">
                    <button className="btn btn-primary rounded-pill btn-lg opacity-75">
                        Login Now
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;