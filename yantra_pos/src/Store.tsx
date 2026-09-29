import { configureStore } from "@reduxjs/toolkit";
import jwtReducer from "./slice/JwtSlice";
import userReducer from "./slice/UserSlice";

const store = configureStore({
  reducer: {
    jwt: jwtReducer,
    user: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;