import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import * as Yup from "yup";
import axios from "axios";

import * as Defines from '../Defines.js'

function Registration() {
  const initialValues = {
    email: "",
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email:    Yup.string().required(),
    username: Yup.string().min(3).max(20).required(),
    password: Yup.string().min(3).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post(Defines.SERVER + '/Users/signup', data).then((res) => {
    console.log(data);

    alert("User successfully registered.");
			console.log(res.data);

		}).catch((err) =>{
			alert("Registration failed.");
			console.log(err);
		});

  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Email: </label>
          <ErrorMessage name="email" component="span" />
          <Field
            autoComplete="off"
            type="email"
            id="inputCreatePost"
            name="email"
            placeholder="Enter your email..."
          />

          <label> Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="Create a username..."
          />

          <p>Username must be at least 3 characters. </p>

          <label> Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Create a password..."
          />

          <p>Password must be at least 3 characters. </p>

          <button type="submit"> Register</button>
        </Form>
      </Formik>

      <div className='terms-of-service-agreement-section'>
					<h1>Terms of Service Agreement:</h1>
					<p>By registering for an account, you automatically agree to the terms of service.
          Be safe with meeting for exchanges.
          Do not give private information that you do not want to expose.
          Be wary of devious people.
          </p>
      </div>
    </div>
  );
}

export default Registration;
