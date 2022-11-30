import React, { useRef, useState } from "react";
import styles from "./MovieCard.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { truncateText } from "../../utils/utils";
import { setBannerMovie } from "../../store/movie-slice/movie-actions";
import { BsCheckLg, BsPlusLg } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
  addToUserWatchList,
  removeFromUserWatchlist,
} from "../../store/movie-slice/movie-actions";
import Spinner from "../loaders/Spinner";

const imageBaseUrl = "https://image.tmdb.org/t/p/original/";

const MovieCard = React.forwardRef(
  ({ movie, isLarge = false, isSearch = false }, ref = null) => {
    // console.log(movie);
    const imageName = isLarge ? movie.poster_path : movie.backdrop_path;
    if (!imageName) return;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { movieList, isMovieActionLoading } = useSelector(
      (state) => state.movie
    );
    const user = useSelector((state) => state.user.user);
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
      console.log(isWatchListed);
      if (isWatchListed) {
        dispatch(removeFromUserWatchlist(user.uid, movie));
      } else {
        dispatch(addToUserWatchList(user.uid, movie));
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
        <div
          className={[styles.card__content, !isSearch && styles.translate].join(
            " "
          )}
        >
          <h4>
            {truncateText(
              movie?.title || movie?.name || movie?.original_name,
              25
            )}
          </h4>
          <p>
            {isLarge
              ? truncateText(movie?.overview || "", 80)
              : truncateText(movie?.overview || "", 50)}
          </p>
          {!isSearch && (
            <div className={styles.card__btns}>
              <button className="btn-primary-sm" onClick={playMovieHandler}>
                Play
              </button>
              <button className="btn-secondary-sm" onClick={watchListHandler}>
                {!isMovieActionLoading && isWatchListed && (
                  <BsCheckLg className={styles.card__btn_icon} />
                )}
                {isMovieActionLoading && <Spinner isSmall={true} />}
                {!isMovieActionLoading && !isWatchListed && (
                  <BsPlusLg className={styles.card__btn_icon} />
                )}
                <span>My List</span>
              </button>
            </div>
          )}
        </div>
      </figure>
    );
  }
);

export default MovieCard;
