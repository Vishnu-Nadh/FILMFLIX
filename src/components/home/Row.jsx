import React from "react";
import styles from "./Row.module.css";
import MovieCard from "../movie/MovieCard";
import { useTmdb } from "../../hooks/use-http";
import CardSkeleton from "../loaders/CardSkeleton";

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const { data: movies, isLoading, error } = useTmdb(fetchUrl, []);

  return (
    <section className={styles.row}>
      <h2 className={`${styles.row__title} heading-secondary`}>{title}</h2>
      <ul className={styles.row__items}>
        {isLoading &&
          [...Array(20).keys()].map((skeleton, id) => (
            <CardSkeleton key={id} isLarge={isLargeRow} />
          ))}
        {!isLoading &&
          movies.map((movie) => {
            return (
              <MovieCard movie={movie} key={movie.id} isLarge={isLargeRow} />
            );
          })}
      </ul>
    </section>
  );
};

export default Row;
