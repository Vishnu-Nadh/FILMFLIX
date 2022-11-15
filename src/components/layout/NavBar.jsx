import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/user-slice";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

const NavBar = () => {
  const [showNav, setShowNav] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const logoutHandler = () => {
    signOut(auth);
    dispatch(logout());
    navigate("/welcome");
  };

  const navClasses = [styles.nav, showNav && styles.nav__black];
  return (
    <nav className={navClasses.join(" ")}>
      <div className={styles.nav__contents}>
        <NavLink to={user ? "/" : "/welcome"}>
          <img src={logo} alt="logo" className={styles.nav__logo} />
        </NavLink>
        <div className={styles.nav__links}>
          {user && (
            <>
              <NavLink className={styles.nav__avatar}>
                <FiUser />
              </NavLink>
              <div className={styles.nav__profile_links}>
                <Link to="/watchlist">WatchList</Link>
                <Link to="/account">My Account</Link>
                <button className="btn-nav" onClick={logoutHandler}>
                  Logout
                </button>
              </div>
            </>
          )}
          {!user && (
            <NavLink to="/auth" state={{ isSignIn: true }}>
              <button className="btn-nav">Login</button>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
