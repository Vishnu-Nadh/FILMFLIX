import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase-config";

const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

console.log();

const userInitialState = {
  user: initialUser,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
