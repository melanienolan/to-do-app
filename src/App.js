import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import InputForm from "./components/InputForm";
import EditForm from "./components/EditForm";
import TodoItem from "./components/TodoItem";
import { FILTERS } from "./utils/constants";
import { todoTemplate, editTemplate } from "./utils/templates";

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [value, setValue] = useState("");
  const [editInput, setEditInput] = useState(editTemplate);
  const [selectedFilter, setSelectedFilter] = useState(FILTERS.ALL);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Date.now();

    setTodos([{ ...todoTemplate, id, value }, ...todos]);
    setValue("");
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleEditSubmit = (id) => (e) => {
    e.preventDefault();
    if (editInput.value) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, value: editInput.value } : todo
        )
      );
    } else {
      handleDelete(id);
    }
    setEditInput(editTemplate);
  };
  const handleOpenEditor = (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    setEditInput({ id, value: todos[index].value });
  };
  const handleEditChange = (e) => {
    setEditInput({
      ...editInput,
      value: e.target.value,
    });
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const filterTodos = (todo) => {
    if (selectedFilter === FILTERS.TODO) return !todo.completed;
    if (selectedFilter === FILTERS.DONE) return todo.completed;
    return todo;
  };

  return (
    <div className="app">
      <h1 className="app__title">To Do App</h1>
      <Filter
        selectedFilter={selectedFilter}
        handleFilterChange={handleFilterChange}
      />
      <InputForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        value={value}
      />
      <ul className="todos-list">
        {todos.filter(filterTodos).map((todo) => {
          return (
            <li className="todos-list--item" key={todo.id}>
              {todo.id !== editInput.id ? (
                <TodoItem
                  todo={todo}
                  handleComplete={handleComplete}
                  handleOpenEditor={handleOpenEditor}
                  handleDelete={handleDelete}
                />
              ) : (
                <EditForm
                  id={todo.id}
                  value={editInput.value}
                  handleEditSubmit={handleEditSubmit}
                  handleEditChange={handleEditChange}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
