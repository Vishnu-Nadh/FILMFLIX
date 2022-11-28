import styles from "./SearchBar.module.css";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import { debounce } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { getSearchResults } from "../../store/movie-slice/movie-actions";
import { movieActions } from "../../store/movie-slice/movie-slice";

const SearchBar = () => {
  const [enteredSearch, setEnteredSearch] = useState("");
  const dispatch = useDispatch();

  const setSearchQuery = debounce((value) => {
    setEnteredSearch(value);
  }, 800);

  const onSearchMovieHandler = (e) => {
    setSearchQuery(e.target.value.trim());
  };

  useEffect(() => {
    if (enteredSearch === "") {
      dispatch(movieActions.setSearchResults([]));
      return;
    }
    dispatch(getSearchResults(enteredSearch));
  }, [enteredSearch]);

  return (
    <div className={styles.search}>
      <FiSearch className={styles.search__icon} />
      <input type="text" onChange={onSearchMovieHandler} />
    </div>
  );
};

export default SearchBar;
