import React from "react";
import Icon from "./Icon";

const EditForm = ({ id, value, handleEditSubmit, handleEditChange }) => {
  return (
    <form className="form" onSubmit={handleEditSubmit(id)}>
      <input
        className="form__input"
        value={value}
        onChange={handleEditChange}
      />
      <button className="button form__button" type="submit">
        <Icon>
          <path
            fillRule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </Icon>
      </button>
    </form>
  );
};

export default EditForm;
