import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/user-slice/user-slice";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import MovieFilter from "../movie/MovieFilter";
import SearchBar from "../search/SearchBar";
import SearchList from "../search/SearchList";

const NavBar = () => {
  const [isNavBlack, setIsNavBlack] = useState(false);
  const [showProfileLinks, setShowProfileLinks] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const transitionNavBar = () => {
    if (window.scrollY >= 100) {
      setIsNavBlack(true);
    } else {
      setIsNavBlack(false);
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

  const navClasses = [styles.nav, isNavBlack && styles.nav__black];
  return (
    <nav className={navClasses.join(" ")}>
      <div className={styles.nav__contents}>
        <NavLink to={user ? "/" : "/welcome"} className={styles.nav__logo_link}>
          {/* <img src={logo} alt="logo" className={styles.nav__logo} /> */}
          <span className={styles.nav__logo}>FILMFLIX</span>
        </NavLink>
        {!user && (
          <div className={styles.login__lg_screen}>
            <NavLink to="/auth" state={{ isSignIn: true }}>
              <button className="btn-nav">Login</button>
            </NavLink>
          </div>
        )}
        <input id="toggle" type="checkbox" className={styles.toggle}></input>
        <label htmlFor="toggle" className={styles.hamburger}>
          <div className={styles["top-bun"]}></div>
          <div className={styles.meat}></div>
          <div className={styles["bottom-bun"]}></div>
        </label>
        <div className={styles.nav__items}>
          {user && (
            <>
              <div className={styles.nav__movie_links}>
                <MovieFilter />
                <SearchBar />
                <SearchList />
              </div>
              <FiUser
                className={styles.nav__user_icon}
                onClick={() => {
                  setShowProfileLinks((prevState) => !prevState);
                }}
              />
              <div
                className={`${styles.nav__profile_links} ${
                  showProfileLinks ? styles.show__profile : ""
                }`}
              >
                <NavLink
                  to="/watchlist"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.active}`
                      : `${styles.nav__profile_link}`
                  }
                >
                  WatchList
                </NavLink>
                <NavLink
                  to="/account"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.active}`
                      : `${styles.nav__profile_link}`
                  }
                >
                  My Account
                </NavLink>
                <button className="btn-nav" onClick={logoutHandler}>
                  Logout
                </button>
              </div>
            </>
          )}
          {!user && (
            <div className={styles.nav__profile_links}>
              <NavLink to="/auth" state={{ isSignIn: true }}>
                <button className="btn-nav">Login</button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
