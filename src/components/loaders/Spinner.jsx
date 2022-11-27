import React from "react";
import "./loaders.css";

const Spinner = ({ isSmall }) => {
  const classNames = ["spinner", isSmall ? "spinner-sm" : "spinner-lg"].join(
    " "
  );
  return <div className={classNames}></div>;
};

export default Spinner;
