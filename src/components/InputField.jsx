//-- InputFiled.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

const InputField = ({ label, type, name, value, onChange, placeholder,maxLength, rightIcon, onRightIconClick }) => {
  const handleDateChange = (e) => {
    const formattedDate = moment(e.target.value).format("YYYY-MM-DD"); // Format date
    onChange({ target: { name, value: formattedDate } });
  };

  return (
    <div className="mb-3 position-relative">
      <label className="form-label">{label}</label>
      <div className="input-group">
        <input
          type={type}
          name={name}
          value={value}
          // onChange={onChange}
          onChange={type === "date" ? handleDateChange : onChange}
          className="form-control"
          placeholder={placeholder}
          maxLength={maxLength}
          required
        />
        {rightIcon && (
          <button type="button" className="btn btn-outline-secondary" onClick={onRightIconClick}>
            <FontAwesomeIcon icon={rightIcon} />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;

// import React from "react";

// const InputField = ({ label, type, name, value, onChange }) => {
//   return (
//     <div className="mb-3">
//       <label className="form-label">{label}</label>
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="form-control"
//         required
//       />
//     </div>
//   );
// };

// export default InputField;
