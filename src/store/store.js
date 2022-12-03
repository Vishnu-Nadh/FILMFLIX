import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-slice/user-slice";
import movieReducer from "./movie-slice/movie-slice";
import subscriptionReducer from "./subscription-slice/subscription-slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,
    subscription: subscriptionReducer,
  },
});

export default store;
