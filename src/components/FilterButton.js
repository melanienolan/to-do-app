import React from "react";

const FilterButton = ({ handleFilterChange, filter, selectedFilter }) => {
  console.log("fb", filter);
  return (
    <button
      className={`button filter__button ${
        filter === selectedFilter ? "filter__button--selected" : ""
      }`}
      value={filter}
      onClick={handleFilterChange}
    >
      {filter}
    </button>
  );
};

export default FilterButton;
