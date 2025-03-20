///-- SelectField.jsx
// export default SelectField;
const SelectField = ({ label, name, value, onChange, options, className, disabled }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`form-control ${className}`}  
        disabled={disabled} 
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
