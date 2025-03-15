import React from 'react';
import './App.css'; 
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormGroup, Label, Input, Button } from "reactstrap";
function Login(){
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

  const onSubmit = (values) => {
    console.log("Form data", values);
  };
  return (
   <>
   <div className='registration-page'>
    <div className='center-div'>
 <div className="form-container">
      <div className="form-card">
        <h2 className="text-center mb-4">User Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form style={{display:"flex",flexDirection:"column", gap:"10px"}}>

              <FormGroup >
                <Label for="email">Email</Label>
                <Field name="email" as={Input} type="email" id="email" className="form-input"/>
                <ErrorMessage name="email" component="div" className="text-danger small" />
              </FormGroup>

              <FormGroup >
                <Label for="password">Password</Label>
                <Field name="password" as={Input} type="password" id="password" className="form-input"/>
                <ErrorMessage name="password" component="div" className="text-danger small" />
              </FormGroup>

              <Button type="submit" color="primary" className="btn-block mt-3">
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>


    </div>
   </div>
   </>
  );
}
export default Login;