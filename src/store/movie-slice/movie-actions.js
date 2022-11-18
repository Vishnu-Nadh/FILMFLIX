import { movieActions } from "./movie-slice";
import {
  collection,
  setDoc,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import db from "../../firebase-config";
import axios from "../../http/axios";
import requests from "../../http/requests";

// MOVIE LIST ACTION CREATERS
export const setInitialMovieList = () => {
  return async (dispatch) => {
    try {
      dispatch(movieActions.setMovieLoading(true));
      dispatch(movieActions.setMovieError(null));
      // fetch data
      const moviesSnapShot = await getDocs(collection(db, "movielist"));
      let movies = [];
      moviesSnapShot.forEach((doc) => {
        const movie = { ...doc.data() };
        movies.push(movie);
      });
      // add to data
      dispatch(movieActions.setInitialMovieData(movies));
      dispatch(movieActions.setMovieLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(movieActions.setMovieLoading(false));
      dispatch(movieActions.setMovieError(error.message));
    }
  };
};

export const addMovieToList = (movie) => {
  return async (dispatch) => {
    // async actions
    try {
      dispatch(movieActions.setMovieLoading(true));
      dispatch(movieActions.setMovieError(null));
      console.log(movie);
      console.log(`${movie.id}`);

      await setDoc(doc(db, "movielist", `${movie.id}`), movie);

      dispatch(movieActions.addToMovieList(movie));
      dispatch(movieActions.setMovieLoading(false));
    } catch (error) {
      console.error("Error adding document: ", error);
      dispatch(movieActions.setMovieLoading(false));
      dispatch(movieActions.setMovieError(error.message));
    }
  };
};

export const removeMovieFromList = (movie) => {
  return async (dispatch) => {
    // async actions
    try {
      dispatch(movieActions.setMovieLoading(true));
      dispatch(movieActions.setMovieError(null));
      console.log(movie);

      await deleteDoc(doc(db, "movielist", `${movie.id}`));

      dispatch(movieActions.removeFromMovieList(movie));
      dispatch(movieActions.setMovieLoading(false));
    } catch (error) {
      console.error("Error deleting document: ", error);
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
      console.error(error)
      dispatch(
        movieActions.setBannerError(error.response?.data?.status_message)
      );
      dispatch(movieActions.setBannerLoading(false));
    }
  };
};
