import React from "react";
import styles from "./Welcome.module.css";

const Welcome = () => {
  return (
    <section className={`${styles.welcome} auth-bg`}>
      <h1 className="heading-primary">Unlimited Movies TV shows and More</h1>
      <h2 className="heading-secondary">Watch anywhere cancel at anytime</h2>
      <p>
        Ready to watch? Enter your email to create or restart your membership
      </p>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input type="text" className="input" placeholder="Email Address" />
        <button type="submit" className="input-btn">
          Get Started
        </button>
      </form>
    </section>
  );
};

export default Welcome;
