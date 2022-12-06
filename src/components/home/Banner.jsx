import styles from "./Banner.module.css";
import { useSelector, useDispatch } from "react-redux";
import { BsPlusLg, BsCheckLg } from "react-icons/bs";
import {
  addToUserWatchList,
  removeFromUserWatchlist,
} from "../../store/movie-slice/movie-actions";
import { truncateText, getGenres, minutesToHours } from "../../utils/utils";
import { useTmdbInit } from "../../hooks/use-http";
import { useNavigate } from "react-router-dom";
import BannerSkeleton from "../loaders/BannerSkeleton";
import Spinner from "../loaders/Spinner";
import Error from "../utility/Error";
import { BsDot } from "react-icons/bs";

const imageBaseUrl = "https://image.tmdb.org/t/p/original";

const Banner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    movieList,
    isMovieActionLoading,
    MovieError,
    currentBannerMovie,
    isBannerLoading,
    BannerError,
  } = useSelector((state) => state.movie);
  const user = useSelector((state) => state.user.user);

  const { data: initialBannerMovie, isLoading, error } = useTmdbInit();

  const displayMovie = currentBannerMovie
    ? currentBannerMovie
    : initialBannerMovie;

  const isWatchListed = movieList.find((movie) => movie.id === displayMovie.id);

  const WatchListHandler = () => {
    if (isWatchListed) {
      dispatch(removeFromUserWatchlist(user.uid, displayMovie));
    } else {
      dispatch(addToUserWatchList(user.uid, displayMovie));
    }
  };

  const playMovieHandler = () => {
    navigate(`/watch/${displayMovie.id}`, {
      state: {
        key: displayMovie?.videos?.results.find(
          (item) => item.type === "Trailer"
        ).key,
      },
    });
  };

  const bannerUrl = displayMovie?.backdrop_path
    ? imageBaseUrl + displayMovie?.backdrop_path
    : "";

  const runtime = displayMovie?.runtime;
  const year = displayMovie?.release_date?.split("-")[0];
  const genres = displayMovie?.genres;

  if (isBannerLoading || isLoading) return <BannerSkeleton />;

  return (
    <header
      className={styles.banner}
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(20,20,20,.9) 0%, rgba(20,20,20,.7) 30% ,rgba(20,20,20,0) 40%),
        linear-gradient(to top, rgba(20,20,20,1) 0%, rgba(20,20,20,.6) 10%, rgba(20,20,20,0) 15%), 
        url(${bannerUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      {(BannerError || error) && <Error errorMessage={error || BannerError} />}
      <section className={styles.banner__contents}>
        <h1 className="heading-primary">
          {displayMovie?.title ||
            displayMovie?.name ||
            displayMovie?.original_name}
        </h1>
        <div className={styles.banner__info}>
          {runtime && <span>{minutesToHours(runtime)}</span>}
          <BsDot />
          {year && <span>{year}</span>}
          <BsDot />
          {genres && <span>{getGenres(genres)}</span>}
        </div>
        <p className={styles.banner__description}>
          {truncateText(`${displayMovie?.overview || ""}`, 150)}
        </p>
        <div className={styles.banner__btns}>
          <button className="btn-primary" onClick={playMovieHandler}>
            Play
          </button>
          <button className="btn-secondary" onClick={WatchListHandler}>
            {!isMovieActionLoading && isWatchListed && (
              <BsCheckLg className={styles.banner__btn_icon} />
            )}
            {isMovieActionLoading && <Spinner isSmall={false} />}
            {!isMovieActionLoading && !isWatchListed && (
              <BsPlusLg className={styles.banner__btn_icon} />
            )}
            <span>Watch List</span>
          </button>
        </div>
      </section>
    </header>
  );
};

export default Banner;
