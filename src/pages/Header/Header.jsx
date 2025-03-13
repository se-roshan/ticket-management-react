// Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuthToken, logoutUser } from "../../services/authService";
import { fetchUserDetails } from "../../services/apiService";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  useEffect(() => {
    const token = getAuthToken();
    if (token && !hasFetched.current) {
      hasFetched.current = true;
      setIsAuthenticated(true);
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetchUserDetails();

      if (response && response.statusCode === 200 && response.data) {
        setUser(response.data);
      } else {
        handleLogout(); // Logout if status is not 200
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      handleLogout();
    }
  };

  const handleLogout = () => {
    logoutUser();
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <header className="shadow sticky-top bg-white">
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png" 
            alt="Logo" width="50" height="50" 
            onClick={()=>{navigate("/dashboard")}}
            />
          </Link>

          <div className="d-flex align-items-center">
            {isAuthenticated ? (
              <div className="dropdown">
                {/* Show Profile Image */}
                <img
                  src={user?.profileImage || "/images/default-user.png"}
                  alt="User"
                  className="rounded-circle"
                  width="40"
                  height="40"
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{ cursor: "pointer" }}
                />
                
                {/* Dropdown Menu */}
                {showDropdown && (
                  <ul className="dropdown-menu dropdown-menu-end show" style={{ position: "absolute", right: 0 }}>
                    <li>
                      <button className="dropdown-item" onClick={() => {
                        setShowDropdown(false);//-- closing toggle before moving to profile page
                        navigate("/profile")}}
                        >My Profile</button>
                    </li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
                <Link to="/register" className="btn btn-primary">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}