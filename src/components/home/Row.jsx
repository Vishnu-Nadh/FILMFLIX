import React from "react";
import styles from "./Row.module.css";
import { useState, useEffect } from "react";
import axios from "../../http/axios";
import MovieCard from "../movie/MovieCard";

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    };
    fetchMovies();
  }, []);

  return (
    <section className={styles.row}>
      <h2 className={`${styles.row__title} heading-secondary`}>{title}</h2>
      <ul className={styles.row__items}>
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} isLarge={isLargeRow} />
        ))}
      </ul>
    </section>
  );
};

export default Row;
