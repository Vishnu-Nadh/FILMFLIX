import React, { useState, useRef } from "react";
import requests from "../../http/requests";
import { useTmdb } from "../../hooks/use-http";
import styles from "./MovieFilter.module.css";
import { BsFilter } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const MovieFilter = () => {
  const { data: allGenres } = useTmdb(requests.fetchGenres, [], (response) => {
    return response.data.genres;
  });

  const [showMenu, setShowMenu] = useState(false);
  const toggleGenreMenu = () => {
    setShowMenu((prevVal) => !prevVal);
  };

  const resultClasses = [
    styles.filter__results,
    showMenu ? styles.show : styles.hidden,
  ].join(" ");

  return (
    <div className={styles.filter}>
      <BsFilter className={styles.filter__icon} onClick={toggleGenreMenu} />
      <div className={resultClasses}>
        {allGenres.map((genre) => (
          <Link
            to={`/genre/${genre.id}`}
            state={genre}
            className={styles.filter__genre}
            key={genre.id}
            onClick={() => {
              setShowMenu(false);
            }}
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieFilter;
