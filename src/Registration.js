import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormGroup, Label, Input, Button } from "reactstrap";
import './Registration.css'; 
import { useNavigate } from 'react-router-dom';

function Registration() {
const navigate=useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post("http://localhost:5102/api/auth/register", {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      alert(response.data.message || "Registration successful!");
      resetForm();
    navigate('/login');
    } catch (error) {
      console.error("Registration Error:", error.response?.data);
      alert(error.response?.data.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };
  function loginbtn(){
    navigate('/login');
  }

  return (
    <div className='registration-page'>
      <div className='center-div'>
        <div className="form-container">
          <div className="form-card">
            <h2 className="text-center mb-4">Register Here!!!</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form >
                  <FormGroup className='form-group'>
                    <Label for="name">Name</Label>
                    <Field name="name" as={Input} type="text" id="name" className="form-input"/>
                    <ErrorMessage name="name" component="div" className="text-danger small" />
                  </FormGroup>

                  <FormGroup className='form-group'>
                    <Label for="email">Email</Label>
                    <Field name="email" as={Input} type="email" id="email" className="form-input"/>
                    <ErrorMessage name="email" component="div" className="text-danger small" />
                  </FormGroup>

                  <FormGroup className='form-group'>
                    <Label for="password">Password</Label>
                    <Field name="password" as={Input} type="password" id="password" className="form-input"/>
                    <ErrorMessage name="password" component="div" className="text-danger small" />
                  </FormGroup>

                  <FormGroup className='form-group'>
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Field name="confirmPassword" as={Input} type="password" id="confirmPassword" className="form-input"/>
                    <ErrorMessage name="confirmPassword" component="div" className="text-danger small" />
                  </FormGroup>

                  
                  <Button type="submit" color="primary" className="btn-block mt-3" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register"}
                  </Button>  <Button color="primary" className="btn-block mt-3" onClick={loginbtn}>
                   Existing User? Login Here
                  </Button>
                  
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
