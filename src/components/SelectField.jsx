const SelectField = ({ label, name, value, onChange, options, className }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`form-control ${className}`} // ✅ Allow external class
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
