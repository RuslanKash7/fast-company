import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ value, onChange, options, label, name, error }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const getInputClasses = () => {
    return "form-check form-check-inline" + (error ? " is-invalid" : "");
  };

  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <div>
        {options.map((option) => (
          <div
            key={option.name + "_" + option.value}
            className={getInputClasses()}
          >
            <input
              className="form-check-input"
              type="radio"
              name={name}
              id={option.name + "_" + option.value}
              checked={option.value === value}
              value={option.value}
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor={option.name + "_" + option.value}
            >
              {option.name}
            </label>
          </div>
        ))}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

RadioField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  options: PropTypes.array,
  label: PropTypes.string,
  error: PropTypes.string
};

export default RadioField;
