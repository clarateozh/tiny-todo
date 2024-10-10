import "./App.css";
import { TODOS } from "./data/todos";
import Navbar from "./components/Navbar";
import Sticky from "./components/Sticky";
import AddNewSticky from "./components/AddNewSticky";
import React, { useReducer, useEffect } from "react";
import { fetchTodos, addTodo, deleteTodo, updateTodo } from "./util/accessDB";

// Using useReducer Hook instead of useState
// otherwise there are too many function pointers
// to pass to the child components via props
function todoReducer(state, action) {
  if (action.type === "ADD_NEW") {
    const id = state.length > 0 ? state[state.length - 1].id + 1 : 1;
    const newList = [...state];
    const newTodo = {
      id: id,
      title: action.title,
      desc: action.desc,
      complete: false,
    };

    newList.push(newTodo);
    addTodo(id, newTodo);
    return newList;
  }

  if (action.type === "POPULATE_SAMPLE") {
    const newList = [...TODOS];
    newList.forEach((item) => addTodo(item.id, item));
    return newList;
  }

  if (action.type === "DELETE") {
    const newList = state.filter((item) => item.id !== action.id);
    deleteTodo(action.id);
    return newList;
  }

  if (action.type === "CLEAR_ALL") {
    state.forEach((item) => deleteTodo(item.id));
    return [];
  }

  if (action.type === "COMPLETED") {
    const index = state.findIndex((item) => item.id === action.id);

    const newList = [...state];
    newList[index].complete = true;
    updateTodo(action.id, newList[index]);
    return newList;
  }

  if (action.type === "SAVE") {
    const index = state.findIndex((item) => item.id === action.id);
    const newList = [...state];
    newList[index].title = action.title;
    newList[index].desc = action.desc;
    updateTodo(action.id, newList[index]);
    return newList;
  }

  if (action.type === "FETCH") {
    const newList = action.payload;
    return newList;
  }

  return state;
}

function App() {
  const [todoState, dispatch] = useReducer(todoReducer, []);

  useEffect(() => {
    fetchTodos().then((payload) =>
      dispatch({ type: "FETCH", payload: payload })
    );
  }, []);

  return (
    <React.StrictMode>
      <div className="App noticeboard mt-6 mr-20 ml-20 mb-10 h-max min-h-dvh rounded-lg border-2 border-slate-300 shadow-2xl shadow-slate-800 ">
        <Navbar onAction={dispatch} todoNum={todoState.length} />
        <ul className="flex flex-wrap gap-10 m-8">
          <AddNewSticky onAction={dispatch} />
          {todoState.map((item) => (
            <Sticky key={item.id} {...item} onAction={dispatch} />
          ))}
        </ul>
      </div>
    </React.StrictMode>
  );
}

export default App;
