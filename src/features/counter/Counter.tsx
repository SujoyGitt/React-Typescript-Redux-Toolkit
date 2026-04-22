import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./counterSlice";

const Counter = () => { 
  const value = useSelector((state: { count: { value: number } }) => state.count.value);
  const dispatch = useDispatch();
  
  console.log("hi how are you")
  return (
    <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl w-80 text-center border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 tracking-wide">Redux + Thunk</h2>

      <p className="text-5xl font-extrabold mb-6 text-green-400">{value}</p>

      <div className="flex justify-center gap-6">
        <button
          className="w-12 h-12 flex items-center justify-center text-xl font-bold bg-green-500 rounded-full shadow-lg hover:bg-green-600 active:scale-90 transition cursor-pointer"
          onClick={() => dispatch(increment())}
        >
          +
        </button>

        <button
          className="w-12 h-12 flex items-center justify-center text-xl font-bold bg-red-500 rounded-full shadow-lg hover:bg-red-600 active:scale-90 transition cursor-pointer"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default Counter;
