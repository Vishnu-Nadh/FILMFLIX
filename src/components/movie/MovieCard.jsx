import React from "react";
import styles from "./MovieCard.module.css";

const imageBaseUrl = "https://image.tmdb.org/t/p/original/";

const MovieCard = ({ movie, isLarge = false }) => {
  console.log(movie);
  const imageName = isLarge ? movie.poster_path : movie.backdrop_path;
  if (!imageName) return;
  return (
    <figure className={styles.card}>
      <img src={`${imageBaseUrl}${imageName}`} alt={movie.title} className={styles.card__image}/>
      <div className={styles.card__content}></div>
    </figure>
  );
};

export default MovieCard;
