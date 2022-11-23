import React from "react";
import "./loaders.css";

const CardSkeleton = ({ isLarge }) => {
  const classNames = [
    "skeleton",
    isLarge ? "skeleton-card-lg" : "skeleton-card",
  ].join(" ");
  return <div className={classNames}></div>;
};

export default CardSkeleton;
