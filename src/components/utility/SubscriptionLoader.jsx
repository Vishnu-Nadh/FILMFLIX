import React from "react";
import styles from "./SubscriptionLoader.module.css";
import { createPortal } from "react-dom";

const loaderRoot = document.getElementById("loader");
const loaderline = document.getElementById("loaderline");

const LoaderModel = () => {
  return createPortal(<div className={styles.loader}></div>, loaderRoot);
};

const LoaderLine = () => {
  return createPortal(
    <div className={styles.loader__line}>
      <div className={styles.loader__bg}></div>
    </div>,
    loaderline
  );
};

const SubscriptionLoader = () => {
  return (
    <>
      <LoaderModel />
      <LoaderLine />
    </>
  );
};

export default SubscriptionLoader;
