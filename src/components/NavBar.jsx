import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.png";

const NavBar = () => {
  const [showNav, setShowNav] = useState(false);
  const transitionNavBar = () => {
    if (window.scrollY >= 100) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => {
      window.removeEventListener("scroll", transitionNavBar);
    };
  }, []);

  const navClasses = [styles.nav, showNav && styles.nav__black];
  return (
    <nav className={navClasses.join(" ")}>
      <div className={styles.nav__contents}>
        <img src={logo} alt="logo" className={styles.nav__logo} />
        <img src={avatar} alt="avatar" className={styles.nav__avatar} />
      </div>
    </nav>
  );
};

export default NavBar;
