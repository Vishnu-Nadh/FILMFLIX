import React from "react";
import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={styles.notfound}>
      <div className={styles.notfound__content}>
        <div class={styles.content}>
          <h2 class={styles.text_shadows}>404</h2>
        </div>
        <h2></h2>
        <h3 className="heading-primary">Oops! Page Not Found.</h3>
        <p>This page does not exist! we suggest you back to home</p>
        <Link to="/">
          <button className="btn-primary">Back To Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
