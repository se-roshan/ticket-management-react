import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "select2/dist/js/select2.full.min.js"; // ✅ Ensure full version is imported

const SelectField = ({ label, name, value, onChange, options }) => {
  const selectRef = useRef(null);

  useEffect(() => {
    if ($.fn.select2) {
      $(selectRef.current).select2(); // ✅ Initialize Select2
      console.log("✅ Select2 initialized successfully.");
    } else {
      console.error("❌ Select2 is not properly loaded.");
    }
  }, []);

  return (
    <div className="form-group">
      <label>{label}</label>
      <select
        ref={selectRef}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
