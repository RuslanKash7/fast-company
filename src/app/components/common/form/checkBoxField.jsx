import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, children, error }) => {
  const handleChange = () => {
    onChange({ name: name, value: !value });
  };

  const getInputClasses = () => {
    return "form-check-input" + (error ? " is-invalid" : "");
  };

  return (
    <div className="form-check mb-4">
      <input
        className={getInputClasses()}
        type="checkbox"
        onChange={handleChange}
        checked={value}
      />
      <label className="form-check-label" htmlFor={name}>
        {children}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

CheckBoxField.propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func,
    name: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    error: PropTypes.string
  };

export default CheckBoxField;
