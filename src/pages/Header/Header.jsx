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
  const hasFetched = useRef(false); // ✅ Moved inside the component

  useEffect(() => {
    const token = getAuthToken();
    if (token && !hasFetched.current) {
      hasFetched.current = true; // ✅ Ensures fetchUserData runs only once
      setIsAuthenticated(true);
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    const userData = await fetchUserDetails();
    if (userData && JSON.stringify(user) !== JSON.stringify(userData)) {
      setUser(userData);
    } else {
      setIsAuthenticated(false);
      logoutUser();
      navigate("/login");
    }
  }; // ✅ Fixed missing closing bracket `}`

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
            <img src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png" alt="Logo" width="50" height="50" />
          </Link>

          <div className="d-flex align-items-center">
            {isAuthenticated ? (
              <div className="dropdown">
                <img
                  src={`https://localhost:7170/${user?.userProfilePics?.find((pic) => pic.isCurrentProfileImage)?.filePath || "images/default-user.png"}`}
                  alt="User"
                  className="rounded-circle"
                  width="40"
                  height="40"
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{ cursor: "pointer" }}
                />
                {showDropdown && (
                  <ul className="dropdown-menu dropdown-menu-end show" style={{ position: "absolute", right: 0 }}>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>Logout</button>
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


// // Header.jsx
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { getAuthToken, logoutUser } from "../../services/authService";
// import { fetchUserDetails } from "../../services/apiService";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function Header() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = getAuthToken();
//     if (token && !isAuthenticated) {
//       setIsAuthenticated(true);
//       fetchUserData();
//     }
//   }, []);

//   const fetchUserData = async () => {
//     const userData = await fetchUserDetails();
//     if (userData) {
//       setUser(userData);
//     } else {
//       setIsAuthenticated(false);
//       logoutUser();
//       navigate("/login");
//     }
//   };

//   const handleLogout = () => {
//     logoutUser();
//     setIsAuthenticated(false);
//     navigate("/login");
//   };

//   return (
//     <header className="shadow sticky-top bg-white">
//       <nav className="navbar navbar-expand-lg navbar-light bg-white">
//         <div className="container-fluid">
//           <Link className="navbar-brand" to="/">
//             <img src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png" alt="Logo" width="50" height="50" />
//           </Link>

//           <div className="d-flex align-items-center">
//             {isAuthenticated ? (
//               <div className="dropdown">
//                 <img
//                   // src={user?.userProfilePics?.find((pic) => pic.isCurrentProfileImage)?.filePath || "/images/default-user.png"}
//                   src={`https://localhost:7170/${user?.userProfilePics?.find((pic) => pic.isCurrentProfileImage)?.filePath}`}

//                   alt="User"
//                   className="rounded-circle"
//                   width="40"
//                   height="40"
//                   onClick={() => setShowDropdown(!showDropdown)}
//                   style={{ cursor: "pointer" }}
//                 />
//                 {showDropdown && (
//                   <ul className="dropdown-menu dropdown-menu-end show" style={{ position: "absolute", right: 0 }}>
//                     <li>
//                       <button className="dropdown-item" onClick={handleLogout}>Logout</button>
//                     </li>
//                   </ul>
//                 )}
//               </div>
//             ) : (
//               <>
//                 <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
//                 <Link to="/register" className="btn btn-primary">Register</Link>
//               </>
//             )}
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }