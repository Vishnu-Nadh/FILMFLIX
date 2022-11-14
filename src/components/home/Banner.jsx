import React from "react";
import styles from "./Banner.module.css";
import { useState, useEffect } from "react";
import axios from "../../http/axios";
import requests from "../../http/requests";

const imageBaseUrl = "https://image.tmdb.org/t/p/original";

const Banner = () => {
  const [bannerMovie, setBannerMovie] = useState({});

  useEffect(() => {
    const fetchNetflixOriginals = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setBannerMovie(
        request.data.results[
          Math.floor(Math.random() * (request.data.results.length - 1))
        ]
      );
      return request;
    };
    fetchNetflixOriginals();
  }, []);

  const truncateText = (text, numChars) => {
    return text.length > numChars
      ? text.substring(0, numChars - 1) + "..."
      : text;
  };

  const bannerUrl = bannerMovie.backdrop_path
    ? imageBaseUrl + bannerMovie.backdrop_path
    : "";
    
  return (
    <header
      className={styles.banner}
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(20,20,20,1) 0%, rgba(20,20,20,.8) 30% ,rgba(20,20,20,0) 50%),
        linear-gradient(to top, rgba(20,20,20,1) 0%, rgba(20,20,20,.8) 15%), 
        url(${bannerUrl})`,
        backgroundSize: "cover",
      }}
    >
      <section className={styles.banner__contents}>
        <h1 className="heading-primary">
          {bannerMovie?.title ||
            bannerMovie?.name ||
            bannerMovie?.original_name}
        </h1>
        <div className={styles.banner__btns}>
          <button className="btn-primary">Play</button>
          <button className="btn-secondary">My List</button>
        </div>
        <p className={styles.banner__description}>
          {truncateText(`${bannerMovie?.overview || ""}`, 150)}
        </p>
      </section>
    </header>
  );
};

export default Banner;
