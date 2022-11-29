import React, { useRef } from "react";
import styles from "./Welcome.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <section className={`${styles.welcome} auth-bg`}>
      <h1 className="heading-primary">Unlimited Movies, TV shows and More</h1>
      <h2 className="heading-secondary">Watch anywhere cancel at anytime</h2>
      <p>
        Ready to watch? Enter your email to create or restart your membership
      </p>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address!")
            .required("Email Cannot be empty!"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          // sent the data to auth screen
          navigate("/auth", {
            state: { email: values.email, isSignIn: false },
          });
          setSubmitting(false);
        }}
      >
        {(formik) => {
          return (
            <Form className={styles.form}>
              <div>
                <Field
                  name="email"
                  type="text"
                  className="input"
                  placeholder="Email Address"
                />
                <button type="submit" className="input-btn">
                  Get Started
                </button>
              </div>
              <div className="error-message">
                <ErrorMessage name="email" />
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default Welcome;
