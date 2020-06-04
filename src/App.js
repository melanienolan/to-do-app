import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import InputForm from "./components/InputForm";
import EditForm from "./components/EditForm";
import TodoItem from "./components/TodoItem";
import { FILTERS } from "./utils/constants";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [editInput, setEditInput] = useState({
    id: 0,
    value: "",
  });
  const [selectedFilter, setSelectedFilter] = useState(FILTERS.ALL);

  useEffect(() => {
    console.log(localStorage.getItem("todos"));
    if (localStorage.todos) {
      setTodos(JSON.parse(localStorage.getItem("todos")));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const newTodo = {
    id: null,
    value: "",
    completed: false,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Date.now();

    setTodos([{ ...newTodo, id, value }, ...todos]);
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
    setEditInput({ id: 0, value: "" });
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
    <div className="container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>To Do App</h1>
          <p>
            Total todos: <pre>{JSON.stringify(selectedFilter, null, 2)}</pre>
          </p>
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
          <div>
            <pre>{JSON.stringify(todos, null, 2)}</pre>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
