import axios from "../http/axios";
import { useEffect, useReducer } from "react";
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

export const useTmdb = (url, initialValue, selectDataFn = selectData) => {
  const initailHttpState = {
    data: initialValue,
    isLoading: false,
    error: false,
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
  }, []);

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
    error: false,
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
