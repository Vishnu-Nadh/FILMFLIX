import React from "react";
import styles from "./Hamburger.module.css";

const Hamburger = () => {
  return (
    <>
      <input id="toggle" type="checkbox" className={styles.toggle}></input>
      <label htmlFor="toggle" className={styles.hamburger}>
        <div className={styles["top-bun"]}></div>
        <div className={styles.meat}></div>
        <div className={styles["bottom-bun"]}></div>
      </label>
    </>
  );
};

export default Hamburger;
