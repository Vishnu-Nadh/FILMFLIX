import React from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/movie/MovieCard";
import { useTmdb } from "../hooks/use-http";
import styles from "./GenreMovies.module.css";
import requests from "../http/requests";

const GenreMovies = () => {
  const location = useLocation();
  const { name: genreName, id } = location.state;
  const { data, isLoading, error } = useTmdb(
    requests.fetchMoviesWithGenre(id),
    [],
    (response) => response.data.results,
    true
  );
  console.log(data);
  return (
    <div className={styles.movies}>
      <h2 className="heading-secondary">{genreName} Movies</h2>
      <section className={styles.movies__items}>
        {data.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </div>
  );
};

export default GenreMovies;
