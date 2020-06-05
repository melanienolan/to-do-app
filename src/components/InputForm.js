import React from "react";
import Icon from "./Icon";

const InputForm = ({ handleSubmit, handleChange, value }) => {
  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        className="form__input"
        type="text"
        name="Add todo"
        onChange={handleChange}
        value={value}
        placeholder={"Enter todo"}
      />
      <button type="submit" className="button form__button" disabled={!value}>
        <Icon>
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </Icon>
      </button>
    </form>
  );
};

export default InputForm;
