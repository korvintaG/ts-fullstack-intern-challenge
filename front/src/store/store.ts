import { configureStore, combineReducers } from "@reduxjs/toolkit";
import catSliceReducer from "./catSlice";
import catLikesSliceReducer from "./catLikeSlice";

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";

export const rootReducer = combineReducers({
  cats: catSliceReducer,
  catLikes: catLikesSliceReducer
  });

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch: () => AppDispatch = () => dispatchHook();
export default store;
