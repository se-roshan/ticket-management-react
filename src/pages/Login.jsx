import React, { useState } from "react";
import { loginUser } from "../services/apiService";
import InputField from "../components/InputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ Correct Image Import
//const ticketIcon = "/images/login/Ticket-Management.jpeg";
const ticketIcon = "/images/login/Ticket-Management.jpeg";


//import ticketIcon from "/src/assets/images/login/Ticket-Management.jpeg";



const Login = () => {
  const [credentials, setCredentials] = useState({ emailOrContactNo: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

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
      localStorage.setItem("token", response.data.data.token);
      alert(response.data.statusText);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        {/* Left Side: Image */}
        <div className="col-md-6 d-none d-md-block">
          <img
            // src={ticketIcon}  // ✅ Fixed Image Import
            src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Ticket Management"
            className="img-fluid rounded"
          />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
