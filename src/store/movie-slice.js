import { createSlice } from "@reduxjs/toolkit";

const initialMovieState = {
  currentBannerMovie: null,
  movieList: [],
};

const MovieSlice = createSlice({
  name: "movie",
  initialState: initialMovieState,
  reducers: {
    setBannerMovie: (state, action) => {
      state.currentBannerMovie = action.payload;
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
  },
});

export const movieActions = MovieSlice.actions;
export default MovieSlice.reducer;
