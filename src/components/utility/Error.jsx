import React from "react";
import styles from "./Error.module.css";
import { BiErrorCircle } from "react-icons/bi";

const Error = ({ errorMessage }) => {
  return (
    <div className={styles.error}>
      <div className={styles.error__content}>
        <BiErrorCircle className={styles.error__icon} />
        <h2>Oops! Somethig went wrong!</h2>
        <p>{errorMessage}</p>
      </div>
    </div>
  );
};

export default Error;
