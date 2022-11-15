import axios from "../http/axios";
import { useEffect, useReducer } from "react";

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
