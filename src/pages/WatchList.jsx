import React from "react";
import MovieCard from "../components/movie/MovieCard";
import { useSelector } from "react-redux";
import styles from "./WatchList.module.css";

const WatchList = () => {
  const movieList = useSelector((state) => state.movie.movieList);
  return (
    <section className={styles.watchlist}>
      {movieList.map((movie) => (
        <MovieCard movie={movie} id={movie.id}/>
      ))}
    </section>
  );
};

export default WatchList;
