import React from "react";
import styles from "./PlanCard.module.css";
import { BiRupee } from "react-icons/bi";

const PlanCard = ({ plan }) => {
  const { name, price, quality, resolution, devices, isActive } = plan;
  const planClasses = [styles.plan, isActive ? styles.active : ""].join(" ");
  return (
    <div className={planClasses}>
      <h2>{name}</h2>
      <span>{quality} quality</span>
      <span>{resolution}</span>
      <span>
        <BiRupee />
        {price}
      </span>
      <div className={styles.plan__devices_section}>
        <h3 className={styles.plan__devices_header}>Devices to watch</h3>
        <div className={styles.plan__devices}>
          {devices.map((device) => (
            <span key={device}>{device}</span>
          ))}
        </div>
      </div>
      <button className={styles.plan__btn}>
        {isActive ? "Active" : "Subscribe"}
      </button>
    </div>
  );
};

export default PlanCard;
