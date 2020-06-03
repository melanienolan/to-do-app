import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");

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
  return (
    <div>
      <h1>To Do App</h1>
      <p>Total todos {value}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Add todo"
          onChange={handleChange}
          value={value}
        />
        <input type="submit" value="Add" />
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <button onClick={() => handleComplete(todo.id)}>
                {todo.completed}
              </button>
              {todo.todo}
            </li>
          );
        })}
      </ul>
      <div>
        <pre>{JSON.stringify(todos, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
