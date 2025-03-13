// Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/apiService";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField"; // Import SelectField Component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const ticketIcon = "/images/Ticket-Management.jpeg"; // Ensure image path is correct

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    contactNo: "",
    password: "",
    gender: "",
    dob: "",
    isActive: true,
  });

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(userData);
      if (response.data.statusCode === 200) {
        alert("Registration successful. Please login.");
        navigate("/login");
      } else {
        alert("Registration failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during registration.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        {/* Left Side: Image */}
        <div className="col-md-6 d-none d-md-block">
          <img
            src={ticketIcon}
            alt="Ticket Management"
            className="img-fluid rounded"
          />
        </div>

        {/* Right Side: Register Form */}
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Full Name - Full Width */}
                <div className="col-md-12">
                  <InputField
                    label="Full Name"
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    placeholder="Enter Your Full Name"
                  />
                </div>

                {/* Email - Full Width */}
                <div className="col-md-12">
                  <InputField
                    label="Email"
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email"
                  />
                </div>

                {/* Contact No & Password - Half Width */}
                <div className="col-md-6">
                  <InputField
                    label="Contact No"
                    type="text"
                    name="contactNo"
                    value={userData.contactNo}
                    onChange={handleChange}
                    placeholder="Enter Your Contact No"
                    maxLength={10}
                  />
                </div>

                <div className="col-md-6">
                  <InputField
                    label="Password"
                    type={showPassword ? "text" : "password"} // Toggle Password Visibility
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    rightIcon={showPassword ? faEyeSlash : faEye} // Show/Hide Icon
                    onRightIconClick={togglePasswordVisibility} // Toggle Function
                  />
                </div>

                {/* Gender & DOB - Half Width */}
                <div className="col-md-6">
                  <SelectField
                    label="Gender"
                    name="gender"
                    value={userData.gender}
                    onChange={handleChange}
                    options={genderOptions}
                  />
                </div>

                <div className="col-md-6">
                  <InputField
                    label="Date of Birth"
                    type="date"
                    name="dob"
                    value={userData.dob}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Register Button */}
              <button type="submit" className="btn btn-primary w-100 mt-3">
                Register
              </button>
            </form>

            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
