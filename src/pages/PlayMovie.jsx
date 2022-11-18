import React from "react";
import styles from "./PlayMovie.module.css";
import { useParams, useLocation } from "react-router-dom";
import Youtube from "react-youtube";

const PlayMovie = () => {
  const { id } = useParams();
  const location = useLocation();
  let key = "";

  if (location.state.videos) {
    key = location.state.videos.find((item) => item.type === "Trailer").key;
  }

  const options = {
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className={styles.play}>
      <Youtube opts={options} videoId={key} className={styles.play__youtube} />
      <p>Description</p>
    </div>
  );
};

export default PlayMovie;
