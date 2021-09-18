import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./redux/reducer";

const store = configureStore({
  reducer: reducer,
  devTools: process.env.name !== "production",
});

export default store;
