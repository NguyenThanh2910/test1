import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import axios from "axios";

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

// Reducer
function todoReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_TODOS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_TODOS_SUCCESS":
      return { ...state, loading: false, todos: action.payload };
    case "FETCH_TODOS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "ADD_TODO_SUCCESS":
      return { ...state, todos: [...state.todos, action.payload] };
    case "REMOVE_TODO_SUCCESS":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, Jobs: action.payload.newJobs }
            : todo
        ),
      };
      case "TOGGLE_TODO":
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
          ),
        };
    default:
      return state;
  }
}

// Async actions
export const fetchTodos = () => async (dispatch) => {
  dispatch({ type: "FETCH_TODOS_REQUEST" });
  try {
    const response = await axios.get(
      "https://6715c7b733bc2bfe40bb1b32.mockapi.io/Jobs"
    );
    dispatch({ type: "FETCH_TODOS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_TODOS_FAILURE", payload: error.message });
  }
};

export const addTodo = (newTodo) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://6715c7b733bc2bfe40bb1b32.mockapi.io/Jobs",
      newTodo
    );
    dispatch({ type: "ADD_TODO_SUCCESS", payload: response.data });
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};

export const removeTodo = (id) => async (dispatch) => {
  try {
    await axios.delete(
      `https://6715c7b733bc2bfe40bb1b32.mockapi.io/Jobs/${id}`
    );
    dispatch({ type: "REMOVE_TODO_SUCCESS", payload: id });
  } catch (error) {
    console.error("Error removing todo:", error);
  }
};

export const updateTodo = (id, newJobs) => async (dispatch) => {
  try {
    const response = await axios.put(
      `https://6715c7b733bc2bfe40bb1b32.mockapi.io/Jobs/${id}`,
      { Jobs: newJobs }
    );
    dispatch({
      type: "UPDATE_TODO",
      payload: { id, newJobs: response.data.Jobs },
    });
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

export const toggleTodo = (id) => async (dispatch) => {
  try {
    const response = await axios.put(
      `https://6715c7b733bc2bfe40bb1b32.mockapi.io/Jobs/${id}`,
      {
        completed: true,
      }
    );
    dispatch({
      type: "TOGGLE_TODO",
      payload: response.data,
    });
  } catch (error) {
    console.error("Error toggling todo:", error);
  }
};

// Create store with thunk middleware
const store = createStore(todoReducer, applyMiddleware(thunk));

export default store;
