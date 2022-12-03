import { movieActions } from "./movie-slice";
import {
  collection,
  setDoc,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import db from "../../firebase-config";
import axios from "../../http/axios";
import requests from "../../http/requests";

// MOVIE LIST ACTION CREATERS

export const setInitialUserWatchList = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(movieActions.setMovieLoading(true));
      dispatch(movieActions.setMovieError(null));
      const userDataSnap = await getDoc(doc(db, "users", `${userId}`));
      if (userDataSnap.exists()) {
        const movies = userDataSnap.data().watchlist;
        dispatch(movieActions.setInitialMovieData(movies));
      } else {
        throw new Error("No such document");
      }
      dispatch(movieActions.setMovieLoading(false));
    } catch (error) {
      console.error(error);
      dispatch(movieActions.setMovieLoading(false));
      dispatch(movieActions.setMovieError(error.message));
    }
  };
};

export const addToUserWatchList = (userId, movie) => {
  return async (dispatch) => {
    try {
      dispatch(movieActions.setMovieLoading(true));
      dispatch(movieActions.setMovieError(null));
      const resp = await updateDoc(doc(db, "users", `${userId}`), {
        watchlist: arrayUnion(movie),
      });
      dispatch(movieActions.addToMovieList(movie));
      dispatch(movieActions.setMovieLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(movieActions.setMovieLoading(false));
      dispatch(movieActions.setMovieError(error.message));
    }
  };
};

export const removeFromUserWatchlist = (userId, movie) => {
  return async (dispatch) => {
    try {
      dispatch(movieActions.setMovieLoading(true));
      dispatch(movieActions.setMovieError(null));

      const resp = await updateDoc(doc(db, "users", `${userId}`), {
        watchlist: arrayRemove(movie),
      });
      dispatch(movieActions.removeFromMovieList(movie));
      dispatch(movieActions.setMovieLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(movieActions.setMovieLoading(false));
      dispatch(movieActions.setMovieError(error.message));
    }
  };
};

export const setBannerMovie = (id) => {
  return async (dispatch) => {
    try {
      dispatch(movieActions.setBannerLoading(true));
      dispatch(movieActions.setBannerError(null));
      // fetch data
      const response = await axios.get(requests.fetchMovieDetails(id));
      const movie = response.data;

      dispatch(movieActions.setBannerMovie(movie));
      dispatch(movieActions.setBannerLoading(false));
    } catch (error) {
      console.error(error);
      dispatch(
        movieActions.setBannerError(error.response?.data?.status_message)
      );
      dispatch(movieActions.setBannerLoading(false));
    }
  };
};

export const getSearchResults = (query) => {
  return async (dispatch) => {
    try {
      dispatch(movieActions.setSearchResultsLoading(true));
      dispatch(movieActions.setSearchResultsError(null));

      const response = await axios.get(requests.fetchMoviesOnQuery(query));
      const movies = response.data.results;
      console.log(query);
      console.log(movies);

      dispatch(movieActions.setSearchResults(movies));
      dispatch(movieActions.setSearchResultsLoading(false));
    } catch (error) {
      console.error(error);
      dispatch(
        movieActions.setSearchResultsError(error.response?.data?.status_message)
      );
      dispatch(movieActions.setSearchResultsLoading(false));
    }
  };
};
