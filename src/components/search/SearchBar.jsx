import React from "react";
import styles from "./SearchBar.module.css";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className={styles.search}>
      <FiSearch className={styles.search__icon}/>
      <input type="text" />
    </div>
  );
};

export default SearchBar;
