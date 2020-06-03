import React, { useState, useEffect } from "react";
import Icon from "./components/Icon";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");

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
    todo: "",
    completed: false,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Date.now();
    const todo = value;

    setTodos([{ ...newTodo, id, todo }, ...todos]);
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
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>To Do App</h1>
          <p>Total todos: </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="Add todo"
              onChange={handleChange}
              value={value}
            />
            <button type="submit">
              <Icon>
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </Icon>
            </button>
          </form>
          <ul>
            {todos.map((todo) => {
              return (
                <li key={todo.id}>
                  <button onClick={() => handleComplete(todo.id)}>
                    <Icon>
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </Icon>
                  </button>
                  {todo.todo}
                  <button onClick={() => handleDelete(todo.id)}>
                    <Icon>
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </Icon>
                  </button>
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
