import React, { useState, useEffect } from "react";
import styles from "./Banner.module.css";
import requests from "../../http/requests";
import { useSelector, useDispatch } from "react-redux";
import { BsPlusLg, BsCheckLg } from "react-icons/bs";
import { useTmdb } from "../../hooks/use-http";
import { movieActions } from "../../store/movie-slice";

const imageBaseUrl = "https://image.tmdb.org/t/p/original";

const Banner = () => {
  const movieList = useSelector((state) => state.movie.movieList);
  const dispatch = useDispatch();
  const currentBannerMovie = useSelector(
    (state) => state.movie.currentBannerMovie
  );
  const {
    data: bannerMovie,
    isLoading,
    error,
  } = useTmdb(
    requests.fetchNetflixOriginals,
    {},
    (request) =>
      request.data.results[
        Math.floor(Math.random() * (request.data.results.length - 1))
      ]
  );
  const displayMovie = currentBannerMovie ? currentBannerMovie : bannerMovie;
  const isWatchListed = movieList.find(movie => movie.id === displayMovie.id)

 
  const WatchListHandler = () => {
    if (isWatchListed) {
      dispatch(movieActions.removeFromMovieList(displayMovie));
    } else {
      dispatch(movieActions.addToMovieList(displayMovie));
    }
  };

  const truncateText = (text, numChars) => {
    return text.length > numChars
      ? text.substring(0, numChars - 1) + "..."
      : text;
  };

  const bannerUrl = displayMovie.backdrop_path
    ? imageBaseUrl + displayMovie.backdrop_path
    : "";

  return (
    <header
      className={styles.banner}
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(20,20,20,.9) 0%, rgba(20,20,20,.7) 30% ,rgba(20,20,20,0) 40%),
        linear-gradient(to top, rgba(20,20,20,1) 0%, rgba(20,20,20,.6) 10%, rgba(20,20,20,0) 15%), 
        url(${bannerUrl})`,
        backgroundSize: "cover",
      }}
    >
      <section className={styles.banner__contents}>
        <h1 className="heading-primary">
          {displayMovie?.title ||
            displayMovie?.name ||
            displayMovie?.original_name}
        </h1>
        <div className={styles.banner__btns}>
          <button className="btn-primary">Play</button>
          <button className="btn-secondary" onClick={WatchListHandler}>
            {isWatchListed && <BsCheckLg className={styles.banner__btn_icon} />}
            {!isWatchListed && <BsPlusLg className={styles.banner__btn_icon} />}
            <span>Watch List</span>
          </button>
        </div>
        <p className={styles.banner__description}>
          {truncateText(`${displayMovie?.overview || ""}`, 150)}
        </p>
      </section>
    </header>
  );
};

export default Banner;
