import "./App.css";
import Counter from "./features/counter/counter";
import Todo from "./features/Todo/Todo";

function App() {

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center flex-col gap-y-8 justify-center p-4">
      <Todo/>
      <Counter/>
    </div>
     
      

    </>
  );
}

export default App;
