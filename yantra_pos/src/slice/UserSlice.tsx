import { createSlice } from "@reduxjs/toolkit";
// import { jwtDecode } from "jwt-decode";

import { jwtDecode } from "jwt-decode"

const getInitialUser = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token || token.split(".").length !== 3) return {};
    return jwtDecode(token);
  } catch {
    return {};
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: getInitialUser() as any,
  reducers: {
    setUser: (_state, action) => action.payload,
    removeUser: () => ({}),
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;