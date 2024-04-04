// Packages
import { configureStore } from "@reduxjs/toolkit";

// Reducer
import ProjectReducer from "./Reducers/Project";

/**
 * Configure store
 */
const store = configureStore({
  reducer: {
    projects: ProjectReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
