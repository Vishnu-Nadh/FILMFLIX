import React from "react";
import MovieCard from "../components/movie/MovieCard";
import { useSelector } from "react-redux";
import styles from "./WatchList.module.css";
import CardSkeleton from "../components/loaders/CardSkeleton";

const WatchList = () => {
  const movieList = useSelector((state) => state.movie.movieList);
  return (
    <section className={styles.watchlist}>
      {movieList.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </section>
  );
};

export default WatchList;
