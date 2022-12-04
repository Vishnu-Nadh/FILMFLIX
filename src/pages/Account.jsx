import React, { useEffect, useId, useState } from "react";
import styles from "./Account.module.css";
import { CiUser } from "react-icons/ci";
import { auth } from "../firebase-config";
import PlanCard from "../components/account/PlanCard";
import {
  fetchProducts,
  fetchSubscriptionInfo,
} from "../store/subscription-slice/subscription-actions";
import { useDispatch, useSelector } from "react-redux";
import { getDate } from "../utils/utils";
import SubscriptionLoader from "../components/utility/SubscriptionLoader";

const Account = () => {
  const email = auth.currentUser ? auth.currentUser.email : "user@gmail.com";
  const userId = auth.currentUser ? auth.currentUser.uid : null;
  const dispatch = useDispatch();
  const { products, subscriptionInfo, checkoutLoading } = useSelector(
    (state) => state.subscription
  );

  useEffect(() => {
    dispatch(fetchProducts());
    if (userId) {
      dispatch(fetchSubscriptionInfo(userId));
    }
  }, [userId]);

  return (
    <>
      {checkoutLoading && <SubscriptionLoader />}
      <main className={styles.account}>
        <section className={styles.account__section}>
          <header className={styles.account__header}>
            <CiUser className={styles.profile__icon} />
            <span className={styles.account__email}>{email}</span>
          </header>
          {subscriptionInfo && (
            <div className={styles.subscription__info}>
              Your Active plan will be renewed on :{" "}
              {subscriptionInfo && getDate(subscriptionInfo?.renewalDate)}
            </div>
          )}
          <div className={styles.account__plans}>
            {products.map((product) => (
              <PlanCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Account;
