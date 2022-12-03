import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./AuthScreen.module.css";
import { useLocation } from "react-router-dom";
import { auth } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/user-slice/user-slice";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import Spinner from "../components/loaders/Spinner";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  signInValidation,
  signUpValidation,
  signUpFromWelcomeValidation,
  signInInitialValues,
  signUpInitialValues,
  signUpFromWelcomeInitialValues,
  createErrorMessage,
} from "../utils/utils";
import { createNewUserData } from "../store/user-slice/user-actions";
import { setInitialUserWatchList } from "../store/movie-slice/movie-actions";

const LoginScreen = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [authError, setAuthError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isConfPasswordShow, setIsConfPasswordShow] = useState(false);


  useEffect(() => {
    const locationState = location.state;
    if (!locationState) return;
    setIsSignIn(locationState.isSignIn);
  }, [location]);

  const authenticateUser = async (values, { setSubmitting }) => {
    // sing in user
    const email = location.state?.email || values.email;
    const password = values.password;

    if (isSignIn) {
      try {
        setAuthError(null);
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch(
          login({
            uid: userCredential.user.uid,
            email: userCredential.user.email,
          })
        );
        // fetch the user data add to movie list
        dispatch(setInitialUserWatchList(userCredential.user.uid));

        setSubmitting(false);
        navigate("/");
      } catch (error) {
        const errorMessage = error.message;
        setAuthError(createErrorMessage(errorMessage));
        setSubmitting(false);
      }
    } else {
      try {
        setAuthError(null);
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // set new use data
        await createNewUserData(
          userCredential.user.uid,
          userCredential.user.email
        );

        setIsSignIn(true);
        setSubmitting(false);
        setAuthError(null);
      } catch (error) {
        const errorMessage = error.message;
        setAuthError(createErrorMessage(errorMessage));
        setSubmitting(false);
      }
    }
  };

  const toggleSignIn = () => {
    setIsSignIn((prevState) => !prevState);
    setAuthError(null);
  };

  const formInitialValues = isSignIn
    ? signInInitialValues
    : location.state?.email
    ? signUpFromWelcomeInitialValues
    : signUpInitialValues;

  const formValidation = isSignIn
    ? signInValidation
    : location.state?.email
    ? signUpFromWelcomeValidation
    : signUpValidation;

  return (
    <section className={`${styles.login} auth-bg`}>
      <Formik
        initialValues={formInitialValues}
        validationSchema={formValidation}
        onSubmit={authenticateUser}
      >
        {(formik) => {
          return (
            <Form className={styles.login__form}>
              <h2 className={styles.login__title}>
                {isSignIn ? "Sign In" : "Sign Up"}
              </h2>
              {authError && !formik.isSubmitting && (
                <div className="auth-error">{authError}</div>
              )}

              {(!location.state?.email || isSignIn) && (
                <div className={styles["input-group"]}>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className={styles.login__input}
                  />
                  <p className={styles["error-message"]}>
                    <ErrorMessage name="email" />
                  </p>
                </div>
              )}
              <div className={styles["input-group"]}>
                <div
                  className={styles.login__icons}
                  onClick={() => {
                    setIsPasswordShow((prevState) => !prevState);
                  }}
                >
                  {isPasswordShow ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </div>
                <Field
                  type={isPasswordShow ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className={styles.login__input}
                />
                <p className={styles["error-message"]}>
                  <ErrorMessage name="password" />
                </p>
              </div>
              {!isSignIn && (
                <div className={styles["input-group"]}>
                  <div
                    className={styles.login__icons}
                    onClick={() => {
                      setIsConfPasswordShow((prevState) => !prevState);
                    }}
                  >
                    {isConfPasswordShow ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </div>
                  <Field
                    type={isConfPasswordShow ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className={styles.login__input}
                  />
                  <p className={styles["error-message"]}>
                    <ErrorMessage name="confirmPassword" />
                  </p>
                </div>
              )}
              <div className="btn-overlay">
                <button type="submit" className={styles.login__btn}>
                  {isSignIn ? "Login" : "Sign Up"}
                </button>
                {formik.isSubmitting && (
                  <div className="btn-loading">
                    <Spinner isWhite={true} />
                  </div>
                )}
              </div>
              <h4 className={styles.login__links}>
                {isSignIn && <span>New to Netflix ?</span>}
                {!isSignIn && <span>Already Have an Account ?</span>}
                <span className={styles.login__link} onClick={toggleSignIn}>
                  <Link to="">{isSignIn ? "Sign Up" : "Login"}</Link>
                </span>
              </h4>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default LoginScreen;
