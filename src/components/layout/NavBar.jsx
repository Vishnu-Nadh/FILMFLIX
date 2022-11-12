import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import { NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";

const NavBar = () => {
  const isAuthenticated = false;
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
        <div className={styles.nav__links}>
          {isAuthenticated && (
            <>
              <NavLink to="">
                <button className="btn-nav">Logout</button>
              </NavLink>
              <NavLink className={styles.nav__avatar}>
                <FiUser />
              </NavLink>
            </>
          )}
          {!isAuthenticated && (
            <NavLink to="/login">
              <button className="btn-nav">Login</button>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
