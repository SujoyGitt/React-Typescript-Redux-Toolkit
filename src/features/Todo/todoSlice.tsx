import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type TodoState = {
  id: number;
  text: string;
  complete: boolean;
};
interface Appstate {
  todos: TodoState[];
  loading: boolean;
}
const initialState: Appstate = {
  todos: [],
  loading: false,
};
export const asyncData = createAsyncThunk("name/fetchData", async () => {
  await new Promise((r) => setTimeout(r, 3000));
  return { id: Date.now(), text: "Work is first Pririty ", complete: true };
});
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    completeTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.complete = !todo.complete;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(asyncData.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(asyncData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(asyncData.fulfilled, (state, action) => {
      state.todos.push(action.payload);
      state.loading = false;
    });
  },
});

export const { addTodo, editTodo, deleteTodo, completeTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
