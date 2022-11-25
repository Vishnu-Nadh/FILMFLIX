import React, { useEffect, useRef, useState } from "react";
import styles from "./MovieCard.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { truncateText } from "../../utils/utils";
import { setBannerMovie } from "../../store/movie-slice/movie-actions";
import { BsCheckLg, BsPlusLg } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
  addMovieToList,
  removeMovieFromList,
} from "../../store/movie-slice/movie-actions";
import CardSkeleton from "../loaders/CardSkeleton";

const imageBaseUrl = "https://image.tmdb.org/t/p/original/";

const MovieCard = React.forwardRef(({ movie, isLarge = false }, ref = null) => {
  // console.log(movie);
  const imageName = isLarge ? movie.poster_path : movie.backdrop_path;
  if (!imageName) return;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movieList } = useSelector((state) => state.movie);
  const imgRef = useRef(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const isWatchListed = movieList.find((item) => item.id === movie.id);

  const setBannerHandler = () => {
    dispatch(setBannerMovie(movie.id));
    navigate("/");
  };

  const imageLoadHandler = () => {
    setIsImageLoading(false);
  };

  const playMovieHandler = (event) => {
    event.stopPropagation();
    navigate(`/watch/${movie.id}`);
  };

  const watchListHandler = (event) => {
    event.stopPropagation();
    if (isWatchListed) {
      dispatch(removeMovieFromList(movie));
    } else {
      dispatch(addMovieToList(movie));
    }
  };

  return (
    <figure
      ref={ref}
      className={
        isLarge ? `${styles.card} ${styles.card__lg}` : `${styles.card}`
      }
      onClick={setBannerHandler}
    >
      {isImageLoading && <div className="img__loader"></div>}
      <img
        ref={imgRef}
        src={`${imageBaseUrl}${imageName}`}
        alt={movie.title}
        className={styles.card__image}
        loading="lazy"
        onLoad={imageLoadHandler}
      />
      <div className={styles.card__content}>
        <h4>{movie?.title || movie?.name || movie?.original_name}</h4>
        <p>
          {isLarge
            ? truncateText(movie?.overview || "", 80)
            : truncateText(movie?.overview || "", 50)}
        </p>
        <div className={styles.card__btns}>
          <button className="btn-primary-sm" onClick={playMovieHandler}>
            Play
          </button>
          <button className="btn-secondary-sm" onClick={watchListHandler}>
            {isWatchListed && <BsCheckLg className={styles.card__btn_icon} />}
            {!isWatchListed && <BsPlusLg className={styles.card__btn_icon} />}
            <span>My List</span>
          </button>
        </div>
      </div>
    </figure>
  );
});

export default MovieCard;
