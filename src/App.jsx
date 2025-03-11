// 📄 App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserList from "./pages/UserList";
import Dashboard from "./pages/Dashboard/dashboard"; 
import Layout from "./Layout";
import { isAuthenticated } from "./services/authService"; 

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    // <Router>
    //   <Routes>
    //     {/* Redirect root to login */}
    //     <Route path="/" element={<Navigate to="/login" />} />
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/login" element={<Login />} />

    //     {/* Layout with Nested Routes */}
    //     <Route path="/" element={<Layout />}>
    //       <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    //       <Route path="/users" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
    //     </Route>
    //   </Routes>
    // </Router>
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
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
