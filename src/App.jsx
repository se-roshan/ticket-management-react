// 📄 App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserList from "./pages/UserList";
import Dashboard from "./pages/Dashboard/dashboard"; 
import MyProfile from "./pages/Profile/Profile"
import Layout from "./Layout";
import { isAuthenticated } from "./services/authService"; 

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Independent Routes (Without Layout) */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Routes Wrapped with Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="users" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />

        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { getUserDetails } from "./features/user/userActions";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import UserList from "./pages/UserList";
// import Dashboard from "./pages/Dashboard/dashboard";
// import MyProfile from "./pages/Profile/Profile";
// import Layout from "./Layout";
// import { isAuthenticated } from "./services/authService";

// const ProtectedRoute = ({ children }) => {
//   return isAuthenticated() ? children : <Navigate to="/login" />;
// };

// const App = () => {
//   const dispatch = useDispatch();

//   // ✅ Fetch user details on app load to keep Redux updated
//   React.useEffect(() => {
//     if (isAuthenticated()) {
//       dispatch(getUserDetails());
//     }
//   }, [dispatch]);

//   return (
//     <Router>
//       <Routes>
//         {/* Independent Routes (Without Layout) */}
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />

//         {/* Routes Wrapped with Layout */}
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Navigate to="/dashboard" />} />
//           <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//           <Route path="users" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
//           <Route path="/profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
//         </Route>

//         {/* Redirect unknown routes */}
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// };

// c
