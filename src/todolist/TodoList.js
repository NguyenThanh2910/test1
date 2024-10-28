import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, fetchTodos, removeTodo, updateTodo, toggleTodo } from "./store"; // Nhập thêm toggleTodo
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const { todos, loading, error } = useSelector((state) => state);
  const [editingId, setEditingId] = useState(null);
  const [editingJob, setEditingJob] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos()); 
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo({ Jobs: newTodo, completed: false }));
      setNewTodo("");
    }
  };

  const handleUpdateTodo = () => {
    if (editingJob.trim()) {
      dispatch(updateTodo(editingId, editingJob));
      setEditingId(null);
      setEditingJob('');
    }
  };

  const handleEditClick = (todo) => {
    setEditingId(todo.id);
    setEditingJob(todo.Jobs);
  };

  const handleToggleTodo = (todo) => {
    dispatch(toggleTodo(todo.id)); 
  };


  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>
        <div className="flex items-center mb-4">
          {editingId === null ? (
            <>
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo"
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddTodo}
                className="p-2 bg-green-500 text-white rounded-r-md hover:bg-green-600 transition-all duration-200 shadow-lg flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                value={editingJob}
                onChange={(e) => setEditingJob(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                onClick={handleUpdateTodo}
                className="p-2 bg-yellow-500 text-white rounded-r-md hover:bg-yellow-600 transition-all duration-200 shadow-lg flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <h2 className="text-xl font-bold mt-4 mb-3">Unfinished</h2>
        <ul className="space-y-2 mb-4">
          {incompleteTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onRemove={() => dispatch(removeTodo(todo.id))}
              onEdit={() => handleEditClick(todo)}
              onToggle={() => handleToggleTodo(todo)} // Thêm sự kiện toggle
            />
          ))}
        </ul>

        <h2 className="text-xl font-bold mt-4 mb-3">Completed</h2>
        <ul className="space-y-2">
          {completedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onRemove={() => dispatch(removeTodo(todo.id))}
              onEdit={() => handleEditClick(todo)}
              onToggle={() => handleToggleTodo(todo)} // Thêm sự kiện toggle
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
