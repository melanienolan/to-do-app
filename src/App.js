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

    setTodos([...todos, { ...newTodo, id, todo }]);
    setValue("");
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <h1>To Do App</h1>
      <p>Total todos {value}</p>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="Add todo"
            onChange={handleChange}
            value={value}
          />
        </label>
        <input type="submit" value="Add" />
      </form>
      <div>
        <pre>{JSON.stringify(todos, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
