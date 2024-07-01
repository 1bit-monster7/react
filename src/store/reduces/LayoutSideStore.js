import { createSlice } from "@reduxjs/toolkit";

const LayoutSideStore = createSlice({
  name: "LayoutSideStore",
  initialState: {
    isCollapsed: false,
  },
  reducers: {
    switchFoldingState: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
  },
});

export const { switchFoldingState } = LayoutSideStore.actions;

export default LayoutSideStore.reducer;
