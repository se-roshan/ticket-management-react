//-- InputFiled.jsx
import React from "react";

const InputField = ({ label, type, name, value, onChange }) => {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
        required
      />
    </div>
  );
};

export default InputField;
