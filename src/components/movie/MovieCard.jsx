import React from "react";
import styles from "./MovieCard.module.css";
import { useDispatch } from "react-redux";
import { movieActions } from "../../store/movie-slice";
import { useNavigate } from "react-router-dom";

const imageBaseUrl = "https://image.tmdb.org/t/p/original/";

const MovieCard = ({ movie, isLarge = false }) => {
  // console.log(movie);
  const imageName = isLarge ? movie.poster_path : movie.backdrop_path;
  if (!imageName) return;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const setBannerHandler = () => {
    dispatch(movieActions.setBannerMovie(movie));
    navigate("/");
  };

  return (
    <figure
      className={
        isLarge ? `${styles.card} ${styles.card__lg}` : `${styles.card}`
      }
      onClick={setBannerHandler}
    >
      <img
        src={`${imageBaseUrl}${imageName}`}
        alt={movie.title}
        className={styles.card__image}
      />
      <div className={styles.card__content}></div>
    </figure>
  );
};

export default MovieCard;
