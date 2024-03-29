import React from "react";
import PropTypes from "prop-types";

function TextAreaField({ label, type, name, value, onChange, error }) {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={getInputClasses()}
          rows="3"
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
}
TextAreaField.defaultProps = {
  type: "text"
};
TextAreaField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default TextAreaField;
