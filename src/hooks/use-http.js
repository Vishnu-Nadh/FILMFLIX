import axios from "../http/axios";
import { useEffect, useReducer, useState } from "react";
import requests from "../http/requests";

const selectData = (response) => response.data.results;

const httpReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { data: state.data, isLoading: true, error: null };
    case "FETCH_SUCCUSS":
      return { data: action.data, isLoading: false, error: null };
    case "FETCH_ERROR":
      return { data: state.data, isLoading: false, error: action.error };
    default:
      return state;
  }
};

export const useTmdb = (
  url,
  initialValue,
  selectDataFn = selectData,
  onDataChange = false
) => {
  const initailHttpState = {
    data: initialValue,
    isLoading: false,
    error: null,
  };

  const [httpState, dispatch] = useReducer(httpReducer, initailHttpState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_START" });
        const response = await axios.get(url);
        const data = selectDataFn(response);
        dispatch({ type: "FETCH_SUCCUSS", data: data });
      } catch (error) {
        const errorMessage = error.response?.data?.status_message;
        dispatch({ type: "FETCH_ERROR", error: errorMessage });
      }
    };
    fetchData();
  }, [onDataChange ? initailHttpState.data : null]);

  return {
    data: httpState.data,
    isLoading: httpState.isLoading,
    error: httpState.error,
  };
};

export const useTmdbInit = () => {
  const initailBannerState = {
    data: {},
    isLoading: false,
    error: null,
  };

  const [bannerState, dispatch] = useReducer(httpReducer, initailBannerState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_START" });
        const response = await axios.get(requests.fetchNetflixOriginals);
        const randomMovie =
          response.data?.results[
            Math.floor(Math.random() * (response.data?.results?.length - 1))
          ];
        const movieInfoResponse = await axios.get(
          requests.fetchMovieDetails(randomMovie.id)
        );

        dispatch({ type: "FETCH_SUCCUSS", data: movieInfoResponse.data });
      } catch (error) {
        const errorMessage = error.response?.data?.status_message;
        dispatch({ type: "FETCH_ERROR", error: errorMessage });
      }
    };
    fetchData();
  }, []);

  return {
    data: bannerState.data,
    isLoading: bannerState.isLoading,
    error: bannerState.error,
  };
};

export const useTmdbInfinite = (
  genreId,
  pageNumber,
  initialValue,
  selectDataFn = selectData
) => {
  const [movies, setMovies] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  const url = requests.fetchMoviesWithGenre(genreId, pageNumber);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get(url);
        const movies = selectDataFn(response);

        setMovies((prevMovies) => {
          return [...new Set([...prevMovies, ...movies])];
        });
        setHasMore(movies.length > 0);
        setIsLoading(false);
      } catch (error) {
        const errorMessage = error.response?.data?.status_message;
        setError(errorMessage);
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [genreId, pageNumber]);
  return {
    movies,
    setMovies,
    isLoading,
    error,
    hasMore,
  };
};
