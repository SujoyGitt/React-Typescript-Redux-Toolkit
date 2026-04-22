import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  completeTodo,
  editTodo,
  asyncData,
} from "./todoSlice";

type TodoType = {
  id: number;
  text: string;
  complete: boolean;
};

const Todo = () => {
  const { todos, loading } = useSelector((state: { todo: { todos: TodoType[] }; }) => state.todo );

  const [text, setText] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const filteredTodos =
    filter === "all"
      ? todos
      : filter === "active"
        ? todos.filter((e) => !e.complete)
        : todos.filter((e) => e.complete);

  console.log(filteredTodos);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!text.trim()) return;

    if (isEditing) {
      dispatch(editTodo({ id: editingId!, text }));
      setIsEditing(false);
      setEditingId(null);
    } else {
      dispatch(
        addTodo({
          id: Date.now(),
          text,
          complete: false,
        }),
      );
    }

    setText("");
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (id: number, newText: string) => {
    setText(newText);
    setEditingId(id);
    setIsEditing(true);
  };

  return (
    <div className="w-3/4 max-w-lg backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl shadow-2xl p-6">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        ✨ My Todos
      </h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {isEditing ? (
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-500 transition"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-500 transition"
          >
            Add
          </button>
        )}
        <button
          onClick={() => dispatch(asyncData())}
          className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-500 transition"
        >
          {loading ? "Loading..." : "default data"}
        </button>
      </div>

      <div className="flex justify-center gap-3 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded-lg ${
            filter === "all"
              ? "bg-purple-600 text-white"
              : "bg-white/10 text-gray-300"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("active")}
          className={`px-3 py-1 rounded-lg ${
            filter === "active"
              ? "bg-purple-600 text-white"
              : "bg-white/10 text-gray-300"
          }`}
        >
          Active
        </button>

        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded-lg ${
            filter === "completed"
              ? "bg-purple-600 text-white"
              : "bg-white/10 text-gray-300"
          }`}
        >
          Completed
        </button>
      </div>

      <ul className="space-y-3">
        {filteredTodos.length === 0 ? (
          <li className="text-gray-400 text-center py-4">
            No tasks to display
          </li>
        ) : (
          filteredTodos.map((todo: TodoType) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-white/10 px-4 py-3 rounded-xl hover:bg-white/20 transition"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.complete}
                  onChange={() => dispatch(completeTodo(todo.id))}
                />

                <span
                  className={`text-white ${
                    todo.complete ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="text-gray-400 hover:text-red-400 transition"
                  onClick={() => handleEdit(todo.id, todo.text)}
                >
                  ✎
                </button>
                <button
                  className="text-gray-400 hover:text-red-400 transition"
                  onClick={() => handleDelete(todo.id)}
                >
                  ✕
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Todo;
