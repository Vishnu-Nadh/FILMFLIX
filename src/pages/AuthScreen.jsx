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
import { login } from "../store/user-slice";

const LoginScreen = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const locationState = location.state;
    if (!locationState) return;
    setIsSignIn(locationState.isSignIn);
  }, [location]);

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (isSignIn) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          dispatch(
            login({
              uid: userCredential.user.uid,
              email: userCredential.user.email,
            })
          );
          navigate("/");
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setIsSignIn(true);
          // navigate("/");
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
    }
  };

  const toggleSignIn = () => {
    setIsSignIn((prevState) => !prevState);
  };

  return (
    <section className={`${styles.login} auth-bg`}>
      <form
        action=""
        method="post"
        onSubmit={authSubmitHandler}
        className={styles.login__form}
      >
        <h2 className={styles.login__title}>
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>
        <div className={styles["input-group"]}>
          <input
            type="email"
            placeholder="Email Adress"
            defaultValue={location.state?.email ? location.state?.email : ""}
            ref={emailRef}
            required
          />
          <p className={styles.input__error}></p>
        </div>
        <div className={styles["input-group"]}>
          <input
            type="password"
            placeholder="Password"
            required
            ref={passwordRef}
          />
          <p className={styles.input__error}></p>
        </div>
        {!isSignIn && (
          <div className={styles["input-group"]}>
            <input type="password" placeholder="Confirm Password" />
            <p className={styles.input__error}></p>
          </div>
        )}
        <button type="submit" className={styles.login__btn}>
          {isSignIn ? "Login" : "Sign Up"}
        </button>
        <h4 className={styles.login__links}>
          {isSignIn && <span>New to Netflix ?</span>}
          {!isSignIn && <span>Already Have an Account ?</span>}
          <span className={styles.login__link} onClick={toggleSignIn}>
            <Link to="">{isSignIn ? "Sign Up" : "Login"}</Link>
          </span>
        </h4>
      </form>
    </section>
  );
};

export default LoginScreen;
