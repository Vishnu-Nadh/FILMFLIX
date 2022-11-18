import React from "react";
import styles from "./MovieCard.module.css";
import { useDispatch } from "react-redux";
// import { movieActions } from "../../store/movie-slice/movie-slice";
import { useNavigate } from "react-router-dom";
import { truncateText } from "../../utils/utils";
import { setBannerMovie } from "../../store/movie-slice/movie-actions";

const imageBaseUrl = "https://image.tmdb.org/t/p/original/";

const MovieCard = ({ movie, isLarge = false }) => {
  // console.log(movie);
  const imageName = isLarge ? movie.poster_path : movie.backdrop_path;
  if (!imageName) return;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const setBannerHandler = () => {
    dispatch(setBannerMovie(movie.id));
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
      <div className={styles.card__content}>
        <h4>{movie?.title || movie?.name || movie?.original_name}</h4>
        <p>
          {isLarge
            ? truncateText(movie?.overview || "", 80)
            : truncateText(movie?.overview || "", 50)}
        </p>
      </div>
    </figure>
  );
};

export default MovieCard;
