const APIKEY = import.meta.env.VITE_TMDB_API_KEY;

// console.log(apiKey);

const requests = {
  fetchTrending: `/trending/movie/week?api_key=${APIKEY}&language=en-US`,
  fetchNetflixOriginals: `discover/movie?api_key=${APIKEY}&with_network=213`,
  fetchTopRated: `movie/top_rated?api_key=${APIKEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${APIKEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${APIKEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${APIKEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${APIKEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${APIKEY}&with_genres=99`,
  fetchGenres: `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}&language=en-US`,
  fetchMovieDetails: (movieId) => {
    return `/movie/${movieId}?api_key=${APIKEY}&language=en-US&append_to_response=videos`;
  },
  fetchMoviesWithGenre: (genreId) => {
    return `/discover/movie?api_key=${APIKEY}&with_genres=${genreId}`;
  },
};

export default requests;
