import React from "react";
import styles from "./SearchList.module.css";
import MovieCard from "../movie/MovieCard";
import { useSelector } from "react-redux";
import { movieActions } from "../../store/movie-slice/movie-slice";
import { useDispatch } from "react-redux";
import CardSkeleton from "../loaders/CardSkeleton";

const SearchList = () => {
  const { searchResults, isSearchResultsLoading, searchResultsError } =
    useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const listClasses = [
    styles.list,
    searchResults.length === 0 ? styles.hide : "",
  ].join(" ");
  return (
    <div className={listClasses}>
      {isSearchResultsLoading &&
        [...Array(3).keys()].map((item, id) => <CardSkeleton />)}
      {searchResults.map((movie) => (
        <div
          onClick={() => {
            dispatch(movieActions.setSearchResults([]));
          }}
        >
          <MovieCard movie={movie} key={movie.id} isSearch={true} />
        </div>
      ))}
    </div>
  );
};

export default SearchList;
