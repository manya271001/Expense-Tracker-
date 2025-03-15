import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormGroup, Label, Input, Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

const onSubmit = async (values, { setSubmitting }) => {
  try {
    const response = await axios.post("http://localhost:5102/api/auth/login", values);

    console.log("Login Response:", response.data); // Debugging log

    const { token, newUser } = response.data; // Corrected key name (was `NewUser`)

    if (!token || !newUser) {
      throw new Error("Invalid API response: Missing token or user data");
    }

    // Store token in local storage
    localStorage.setItem("token", token);

    // Dispatch user data to Redux
    dispatch(setUser({
      id: newUser.id, // Corrected property names
      name: newUser.name,
      email: newUser.email,
      initialBalance: newUser.initialBalance,
      numberOfGroups: newUser.numberOfGroups,
      hasSetup: newUser.hasSetup,
    }));

    // Navigate to homepage after login
    navigate("/");
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Login failed. Please try again.");
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div className="registration-page">
      <div className="center-div">
        <div className="form-container">
          <div className="form-card">
            <h2 className="text-center mb-4">User Login</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
              {({ isSubmitting }) => (
                <Form >
                  <FormGroup className="form-group">
                    <Label for="email">Email</Label>
                    <Field name="email" as={Input} type="email" id="email" className="form-input" />
                    <ErrorMessage name="email" component="div" className="text-danger small" />
                  </FormGroup>

                  <FormGroup className="form-group">
                    <Label for="password">Password</Label>
                    <Field name="password" as={Input} type="password" id="password" className="form-input" />
                    <ErrorMessage name="password" component="div" className="text-danger small" />
                  </FormGroup>

                  <Button type="submit" color="primary" className="btn-block mt-3" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
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

export default Login;
