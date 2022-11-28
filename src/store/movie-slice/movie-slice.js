import { createSlice } from "@reduxjs/toolkit";

const initialMovieState = {
  movieList: [],
  isMovieActionLoading: false,
  MovieActionError: null,
  currentBannerMovie: null,
  isBannerLoading: false,
  BannerError: null,
  searchResults: [],
  isSearchResultsLoading: false,
  searchResultsError: null,
};

const MovieSlice = createSlice({
  name: "movie",
  initialState: initialMovieState,
  reducers: {
    setBannerMovie: (state, action) => {
      state.currentBannerMovie = action.payload;
    },

    setInitialMovieData: (state, action) => {
      state.movieList = action.payload;
    },
    addToMovieList: (state, action) => {
      const movie = state.movieList.find(
        (movie) => movie.id === action.payload.id
      );
      if (movie) return;
      state.movieList.push(action.payload);
    },
    removeFromMovieList: (state, action) => {
      state.movieList = state.movieList.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
    setMovieLoading: (state, action) => {
      state.isMovieActionLoading = action.payload;
    },
    setMovieError: (state, action) => {
      state.MovieActionError = action.payload;
    },
    setBannerLoading: (state, action) => {
      state.isBannerLoading = action.payload;
    },
    setBannerError: (state, action) => {
      state.BannerError = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setSearchResultsLoading: (state, action) => {
      state.isSearchResultsLoading = action.payload;
    },
    setSearchResultsError: (state, action) => {
      state.searchResultsError = action.payload;
    },
  },
});

export const movieActions = MovieSlice.actions;
export default MovieSlice.reducer;
