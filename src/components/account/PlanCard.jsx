import React from "react";
import styles from "./PlanCard.module.css";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  checkoutSubscription,
  cancelSubscription,
} from "../../store/subscription-slice/subscription-actions";

const setButtonText = (isActive, planPrice, planName, subscribedPrice = 0) => {
  if (isActive) {
    return "Unsubscribe";
  }
  if (!isActive && subscribedPrice < planPrice) {
    return `Upgrade to ${planName}`;
  }

  if (!isActive && subscribedPrice > planPrice) {
    return `Switch to ${planName}`;
  }
};

const PlanCard = ({ product }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.uid);
  const subscriptionInfo = useSelector(
    (state) => state.subscription.subscriptionInfo
  );
  const { name, description: resolution } = product;
  const { id: priceId, unit_amount: price } = product.prices[0];
  const { devices, quality } = product.metadata;

  let isActive = subscriptionInfo?.plan === name;
  const planClasses = [styles.plan, isActive ? styles.active : ""].join(" ");

  const checkoutSubscriptionHandler = () => {
    if (isActive) {
      // cancel subscription
      dispatch(cancelSubscription(userId));
    } else {
      // switch subscriptin
      dispatch(checkoutSubscription(priceId, userId));
    }
  };


  return (
    <div className={planClasses}>
      <h2>{name}</h2>
      <span>{quality}</span>
      <span>{resolution}</span>
      <span>
        <BiRupee />
        {(price / 100).toFixed(2)}
      </span>
      <div className={styles.plan__devices_section}>
        <h3 className={styles.plan__devices_header}>Devices to watch</h3>
        <div className={styles.plan__devices}>
          {devices.split(",").map((device) => (
            <span key={device}>{device}</span>
          ))}
        </div>
      </div>
      <button
        className={styles.plan__btn}
        onClick={checkoutSubscriptionHandler}
      >
        {setButtonText(isActive, price, name, subscriptionInfo?.price)}
      </button>
    </div>
  );
};

export default PlanCard;
