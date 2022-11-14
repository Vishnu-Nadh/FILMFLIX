import React, { useRef } from "react";
import styles from "./Welcome.module.css";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const emailRef = useRef();
  const navigate = useNavigate();
  const emailSubmitHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    navigate("/auth", { state: { email: email, isSignIn: false } });
  };
  return (
    <section className={`${styles.welcome} auth-bg`}>
      <h1 className="heading-primary">Unlimited Movies, TV shows and More</h1>
      <h2 className="heading-secondary">Watch anywhere cancel at anytime</h2>
      <p>
        Ready to watch? Enter your email to create or restart your membership
      </p>
      <form action="" onSubmit={emailSubmitHandler}>
        <input
          type="email"
          className="input"
          placeholder="Email Address"
          ref={emailRef}
          required
        />
        <button type="submit" className="input-btn">
          Get Started
        </button>
      </form>
    </section>
  );
};

export default Welcome;
