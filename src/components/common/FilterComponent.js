import React from "react";

const FilterComponent = ({
  filterText,
  onFilter,
  onClear,
  filterPlaceholder,
  filterOptions = [],
}) => (
  <div className="row col-lg-12 gx-2 gy-2 align-items-end mb-2">
    {filterOptions.map((option, index) => (
      <React.Fragment key={index}>{option}</React.Fragment>
    ))}

    <div
      className={`col-lg-${
        filterOptions.length > 0 ? 3 : 2
      } col-md-6 col-sm-12 ms-auto`}
    >
      <div className="my_profile_setting_input form-group input-group filter-component">
        <input
          id="search-input"
          type="text"
          placeholder={filterPlaceholder}
          aria-label="Search Input"
          value={filterText}
          onChange={onFilter}
          className="form-control"
          style={{ height: "50px" }}
        />
        <button
          id="search-clear-button"
          type="button"
          onClick={onClear}
          className="btn btn-outline-danger"
          style={{ height: "50px" }}
        >
          &times;
        </button>
      </div>
    </div>
  </div>
);

export default FilterComponent;
