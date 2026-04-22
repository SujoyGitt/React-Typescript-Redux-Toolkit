import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/Todo/todoSlice"
import counterReducer from "../features/counter/counterSlice"

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    count: counterReducer
  },
});
