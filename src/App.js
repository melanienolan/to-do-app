import React, { useState, useEffect } from "react";
import Icon from "./components/Icon";

const FILTERS = {
  ALL: "all",
  TODO: "to do",
  DONE: "done",
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [editInput, setEditInput] = useState({
    id: 0,
    value: "",
  });
  const [filter, setFilter] = useState(FILTERS.ALL);

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

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filterTodos = (todo) => {
    if (filter === FILTERS.TODO) return !todo.completed;
    if (filter === FILTERS.DONE) return todo.completed;
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
            Total todos: <pre>{JSON.stringify(filter, null, 2)}</pre>
          </p>
          <div className="filter">
            <button
              className={`button filter__button ${
                filter === FILTERS.ALL ? "filter__button--selected" : ""
              }`}
              value={FILTERS.ALL}
              onClick={handleFilterChange}
            >
              {FILTERS.ALL}
            </button>
            <button
              className={`button filter__button ${
                filter === FILTERS.TODO ? "filter__button--selected" : ""
              }`}
              value={FILTERS.TODO}
              onClick={handleFilterChange}
            >
              {FILTERS.TODO}
            </button>
            <button
              className={`button filter__button ${
                filter === FILTERS.DONE ? "filter__button--selected" : ""
              }`}
              value={FILTERS.DONE}
              onClick={handleFilterChange}
            >
              {FILTERS.DONE}
            </button>
          </div>
          <form onSubmit={handleSubmit} className="form">
            <input
              className="form__input form__input--main"
              type="text"
              name="Add todo"
              onChange={handleChange}
              value={value}
              placeholder={"Enter todo"}
            />
            <button type="submit" className="button form__button">
              <Icon>
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </Icon>
            </button>
          </form>
          <ul className="todos-list">
            {todos.filter(filterTodos).map((todo) => {
              return (
                <li className="todos-list--item" key={todo.id}>
                  {todo.id !== editInput.id && (
                    <>
                      <button
                        className={`button todos-list__button ${
                          todo.completed
                            ? "todos-list__button--complete"
                            : "todos-list__button--incomplete"
                        }`}
                        onClick={() => handleComplete(todo.id)}
                      >
                        {todo.completed && (
                          <Icon>
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </Icon>
                        )}
                      </button>
                      <span
                        className={`todos-list__text ${
                          todo.completed ? "todos-list__text--completed" : ""
                        }`}
                      >
                        {todo.value}
                      </span>
                      <div>
                        <button
                          className="button todos-list__button todos-list__button--edit"
                          onClick={() => handleOpenEditor(todo.id)}
                        >
                          <Icon>
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                            <path
                              fillRule="evenodd"
                              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                              clipRule="evenodd"
                            />
                          </Icon>
                        </button>
                        <button
                          className="button todos-list__button todos-list__button--delete"
                          onClick={() => handleDelete(todo.id)}
                        >
                          <Icon>
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </Icon>
                        </button>
                      </div>
                    </>
                  )}

                  {todo.id === editInput.id && (
                    <form className="form" onSubmit={handleEditSubmit(todo.id)}>
                      <input
                        className="form__input form__input--edit"
                        value={editInput.value}
                        onChange={(e) => {
                          setEditInput({
                            ...editInput,
                            value: e.target.value,
                          });
                        }}
                      />
                      <button
                        className="button todos-list__button todos-list__button--submit"
                        type="submit"
                      >
                        <Icon>
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </Icon>
                      </button>
                    </form>
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
