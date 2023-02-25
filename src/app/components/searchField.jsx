import React from "react";
import PropTypes from "prop-types";

const SearchField = ({ onSearch, searchName }) => { // передал в users.jsx
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        aria-label="Username"
        aria-describedby="basic-addon1"
        value={searchName}
        onChange={onSearch}
      />
    </div>
  );
};

SearchField.propTypes = {
  onSearch: PropTypes.func,
  searchName: PropTypes.string
};

export default SearchField;
