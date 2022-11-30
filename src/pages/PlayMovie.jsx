import React, { useEffect, useReducer, useState } from "react";
import styles from "./PlayMovie.module.css";
import { useParams, useLocation } from "react-router-dom";
import Youtube from "react-youtube";
import axios from "../http/axios";
import requests from "../http/requests";
import PlaySkeleton from "../components/loaders/PlaySkeleton";
import Error from "../components/utility/Error";

const initialKeyState = {
  youtubeKey: "",
  isKeyLoading: false,
  keyError: null,
};

const httpReducer = (state, action) => {
  switch (action.type) {
    case "START":
      return {
        youtubeKey: state.youtubeKey,
        isKeyLoading: true,
        keyError: null,
      };
    case "SUCCESS":
      return {
        youtubeKey: action.key,
        isKeyLoading: false,
        keyError: null,
      };
    case "ERROR":
      return {
        youtubeKey: "",
        isKeyLoading: false,
        keyError: action.error,
      };
    default:
      return initialKeyState;
  }
};

const PlayMovie = () => {
  const { id } = useParams();
  const location = useLocation();
  const [keyState, dispatch] = useReducer(httpReducer, initialKeyState);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    if (location.state?.key) {
      dispatch({ type: "SUCCESS", key: location.state.key });
      return;
    }
    const fetchKey = async () => {
      try {
        dispatch({ type: "START" });
        const response = await axios.get(requests.fetchMovieDetails(id));
        const key = response.data?.videos?.results.find(
          (item) => item.type === "Trailer"
        ).key;
        dispatch({ type: "SUCCESS", key: key });
      } catch (error) {
        console.error(error);
        dispatch({ type: "ERROR", error: error.message });
      }
    };
    fetchKey();
  }, [dispatch]);

  const setPlayerReady = () => {
    setIsPlayerReady(true);
  };

  const options = {
    allowPresentation: true,
    playerVars: {
      autoplay: 0,
    },
  };

  console.log(keyState);

  return (
    <div className={styles.play}>
      {!isPlayerReady && !keyState.keyError && <PlaySkeleton />}
      {keyState.keyError && <Error errorMessage={keyState.keyError} />}
      {!keyState.keyError && (
        <Youtube
          opts={options}
          videoId={keyState.youtubeKey}
          className={styles.play__youtube}
          onReady={setPlayerReady}
        />
      )}
    </div>
  );
};

export default PlayMovie;
