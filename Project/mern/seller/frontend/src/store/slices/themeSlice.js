import { createSlice } from "@reduxjs/toolkit";
import { themeInitialState } from "./initialStates";

const themeSlice = createSlice({
  name: "theme",
  initialState: themeInitialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      state.bgColor = state.isDarkMode ? "#000" : "#fff";
      state.txtColor = !state.isDarkMode ? "#000" : "#fff";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
