import React, { useReducer, useState } from "react";

const initialState: State = {
  name: "",
  email: "",
  age: 0,
  isLoggedIn: false,
};

type State = {
  name: string;
  email: string;
  age: number;
  isLoggedIn: boolean;
};

type Action =
  | { type: "SET_FIELD"; field: keyof State; value: State[keyof State] }
  | { type: "RESET" }
  | { type: "TOGGLE_LOGIN" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "TOGGLE_LOGIN":
      return {
        ...state,
        isLoggedIn: !state.isLoggedIn,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

const MyForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state);
    dispatch({ type: "RESET" });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    dispatch({ type: "SET_FIELD", field: name as keyof State, value });
  };
  return (
    <>
      <form
        className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl space-y-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          User Form
        </h2>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={(e) => handleChange(e)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={(e) => handleChange(e)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            type="number"
            name="age"
            value={state.age}
            onChange={(e) => handleChange(e)}
            placeholder="Enter your age"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default MyForm;
