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
    addToMovieList: (state, action) => {},
    removeFromMovieList: (state, action) => {},
  },
});

export const movieActions = MovieSlice.actions;
export default MovieSlice.reducer;
