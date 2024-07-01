import { configureStore } from "@reduxjs/toolkit";
import LayoutSideStore from "@/store/reduces/LayoutSideStore";

export default configureStore({
  reducer: {
    LayoutSideStore,
  },
});
