import React from "react";
import styles from "./Account.module.css";
import { CiUser } from "react-icons/ci";
import { auth } from "../firebase-config";
import PlanCard from "../components/account/PlanCard";
import { plansDetails } from "../data/data";

const Account = () => {
  const email = auth.currentUser ? auth.currentUser.email : "user@gmail.com";
  return (
    <main className={styles.account}>
      <section className={styles.account__section}>
        <header className={styles.account__header}>
          <CiUser className={styles.profile__icon} />
          <span className={styles.account__email}>{email}</span>
        </header>
        <div className={styles.account__plans}>
          {plansDetails.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Account;
