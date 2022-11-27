import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/movie/MovieCard";
import { useTmdbInfinite } from "../hooks/use-http";
import styles from "./GenreMovies.module.css";
import CardSkeleton from "../components/loaders/CardSkeleton";

const GenreMovies = () => {
  const location = useLocation();
  const [pageNumber, setPageNumber] = useState(1);
  const { name: genreName, id } = location.state;
  const { movies, setMovies, isLoading, error, hasMore } = useTmdbInfinite(
    id,
    pageNumber,
    []
  );
  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );
  useEffect(() => {
    setMovies([]);
    setPageNumber(1);
  }, [id]);

  return (
    <div className={styles.movies}>
      <h2 className="heading-secondary">{genreName} Movies</h2>
      <section className={styles.movies__items}>
        {!isLoading &&
          movies.map((movie, index) => {
            if (movies.length === index + 1) {
              return (
                <MovieCard key={movie.id} movie={movie} ref={lastElementRef} />
              );
            } else {
              return <MovieCard key={movie.id} movie={movie} />;
            }
          })}
        {isLoading &&
          [...Array(20).keys()].map((skl, i) => (
            <CardSkeleton isLarge={false} key={i} />
          ))}
        {error && <h2>Error! {error}</h2>}
      </section>
    </div>
  );
};

export default GenreMovies;
