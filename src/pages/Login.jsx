// Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/apiService";
import { setAuthToken } from "../services/authService";
import InputField from "../components/InputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const ticketIcon = "/images/Ticket-Management.jpeg"; // Ensure image path is correct

const Login = () => {
  const [credentials, setCredentials] = useState({ emailOrContactNo: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(credentials);
      if (response.data.statusCode === 200) {
        setAuthToken(response.data.data.token);
        //alert("Login successful");
        //navigate("/users");
        navigate("/dashboard"); // 🔹 Redirect to Dashboard
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        {/* Left Side: Image */}
        <div className="col-md-6 d-none d-md-block">
          <img src={ticketIcon} alt="Ticket Management" className="img-fluid rounded" />
        </div>

        {/* Right Side: Login Form */}
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <InputField
                label="Email or Contact No"
                type="text"
                name="emailOrContactNo"
                value={credentials.emailOrContactNo}
                onChange={handleChange}
              />

              {/* Password Field with Eye Icon */}
              <div className="mb-3 position-relative">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-success w-100">Login</button>
            </form>
            <p className="text-center mt-3">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;