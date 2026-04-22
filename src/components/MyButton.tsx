import React, { useReducer } from "react";
import useTheme from "../hook/useTheme";

type State = { count: number };
type Action = { type: "increment" } | { type: "decrement" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      if (state.count <= 1) {
        return { count: 1 };
      }
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const initialState = {
  count: 0,
};

const MyButton = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            dispatch({ type: "increment" });
            toggleTheme();
          }}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 active:scale-95 transition"
        >
          +
        </button>

        <button
          onClick={() => {
            dispatch({ type: "decrement" });
            toggleTheme();
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 active:scale-95 transition"
        >
          -
        </button>

        <p className="text-xl font-semibold ">{state.count}</p>
      </div>
    </>
  );
};

export default MyButton;
