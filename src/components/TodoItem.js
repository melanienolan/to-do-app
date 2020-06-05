import React from "react";
import Icon from "./Icon";

const TodoItem = ({ todo, handleComplete, handleOpenEditor, handleDelete }) => {
  return (
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
      <div className="todos-list__container">
        <button
          className="button todos-list__button"
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
          className="button todos-list__button"
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
  );
};

export default TodoItem;
