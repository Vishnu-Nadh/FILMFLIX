import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  checkoutLoading: false,
  checkoutError: null,
  stripeConfigs: null,
  subscriptionInfo: null,
};

const subscriptionSlice = createSlice({
  name: "subscribtion",
  initialState: initialState,
  reducers: {
    setInitialProducts: (state, action) => {
      state.products = action.payload;
    },
    setCheckoutLoading: (state, action) => {
      state.checkoutLoading = action.payload;
    },
    setCheckoutError: (state, action) => {
      state.checkoutError = action.payload;
    },
    setStripeConfigs: (state, action) => {
      state.stripeConfigs = action.payload;
    },
    setSubscriptionInfo: (state, action) => {
      state.subscriptionInfo = action.payload;
    },
  },
});

export const subscriptionActions = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
