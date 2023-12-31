import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: false,
    username: "",
  },
  reducers: {
    loginState: (state) => {
      state.value = true;
    },
    logoutState: (state) => {
      state.value = false;
      state.username = "";
    },
    setUser: (state, action) => {
      const { username } = action.payload;
      state.username = username;
    },
  },
});

export const { loginState, logoutState, setUser } = userSlice.actions;

export default userSlice.reducer;
