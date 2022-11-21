import React, { useState, useRef } from "react";
import requests from "../../http/requests";
import { useTmdb } from "../../hooks/use-http";
import styles from "./MovieFilter.module.css";
import { BsFilter } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const MovieFilter = () => {
  // const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { data: allGenres } = useTmdb(requests.fetchGenres, [], (response) => {
    return response.data.genres;
  });


  return (
    <div className={styles.filter}>
      <BsFilter className={styles.filter__icon} />
      <div className={styles.filter__results}>
        {allGenres.map((genre) => (
          <Link
            to={`/genre/${genre.id}`}
            state={genre}
            className={styles.filter__genre}
            key={genre.id}
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieFilter;
