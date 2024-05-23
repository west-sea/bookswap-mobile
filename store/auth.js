import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    signIn(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    signOut(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
