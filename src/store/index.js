import { configureStore } from "@reduxjs/toolkit";
import LayoutSideStore from "@/store/reduces/LayoutSideStore";
import TagViewsStore from "@/store/reduces/TagViewsStore";

export default configureStore({
  reducer: {
    LayoutSideStore,
    TagViewsStore,
  },
});
