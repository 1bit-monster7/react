import { createSlice } from "@reduxjs/toolkit";

const TagViewsStore = createSlice({
  name: "TagViewsStore",
  initialState: {
    tagViewsList: [
      {
        path: "/dashboard",
        name: "dashboard",
        label: "首页",
        icon: "HomeOutlined",
        url: "/dashboard/index",
        anchor: true,
      },
    ],
  },
  reducers: {
    addTagViews: (state, { payload }) => {
      if (!state.tagViewsList.find((v) => v.path === payload.path)) {
        state.tagViewsList.push({ ...payload });
      }
    },
    removeTagViews: (state, { payload }) => {
      const tagIndex = state.tagViewsList.findIndex(
        (v) => v.path === payload.path,
      );
      if (tagIndex > -1) {
        state.tagViewsList.splice(tagIndex, 1);
      }
    },
  },
});

export const { addTagViews,removeTagViews } = TagViewsStore.actions;

export default TagViewsStore.reducer;
