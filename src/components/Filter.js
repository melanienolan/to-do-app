import React from "react";
import FilterButton from "./FilterButton";
import { FILTERS } from "../utils/constants";

const Filter = ({ ...props }) => {
  const filters = Object.values(FILTERS);
  return (
    <div className="filter">
      {filters.map((filter) => (
        <FilterButton key={filter} filter={filter} {...props} />
      ))}
    </div>
  );
};

export default Filter;
