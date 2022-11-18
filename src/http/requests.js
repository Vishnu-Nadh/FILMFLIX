const APIKEY = import.meta.env.VITE_TMDB_API_KEY;

// console.log(apiKey);

const requests = {
  fetchTrending: `/trending/all/week?api_key=${APIKEY}&language=en-US`,
  fetchNetflixOriginals: `discover/movie?api_key=${APIKEY}&with_network=213`,
  fetchTopRated: `movie/top_rated?api_key=${APIKEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${APIKEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${APIKEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${APIKEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${APIKEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${APIKEY}&with_genres=99`,
  fetchMovieDetails: (movieId) => {
    return `/movie/${movieId}?api_key=${APIKEY}&language=en-US&append_to_response=videos`;
  },
};

export default requests;
