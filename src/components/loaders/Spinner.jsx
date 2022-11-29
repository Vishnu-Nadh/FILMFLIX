import React from "react";
import "./loaders.css";

const Spinner = ({ isSmall, isWhite }) => {
  const classNames = [
    "spinner",
    isSmall ? "spinner-sm" : "spinner-lg",
    isWhite ? "spinner-white" : "",
  ].join(" ");
  return <div className={classNames}></div>;
};

export default Spinner;
