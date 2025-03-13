import React, { useState, useRef } from "react";

function Profile() {
  const [user, setUser] = useState({
    id: 2,
    name: "Roshan",
    email: "test@gmail.com",
    contactNo: "999999999",
    gender: "Male",
    dob: "2025-03-12",
    isActive: true,
    profileImage: "",
    role: "Admin",
  });

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const fileInputRef = useRef(null);

  // Handle Image Upload and Auto-Close Dropdown
  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser({ ...user, profileImage: imageUrl });
      setShowDropdown(false); // Auto-close dropdown
    }
  };

  // Handle Remove Image and Auto-Close Dropdown
  const handleRemoveImage = () => {
    const confirmDelete = window.confirm("Are you sure you want to reset your current avatar?");
    if (confirmDelete) {
      setUser({ ...user, profileImage: "" });
      setShowDropdown(false); // Auto-close dropdown
    }
  };

  // Handle Profile Update
  const handleUpdateProfile = () => {
    alert("Profile updated successfully!");
  };

  // Handle Password Update
  const handleChangePassword = () => {
    if (password.newPassword !== password.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    alert("Password updated successfully!");
  };

  return (
    <div className="container mt-4">
      <h3>Public Profile</h3>
      <div className="row">
        {/* Left: User Info */}
        <div className="col-md-8">
          <div className="card p-3">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contact No</label>
              <input
                type="text"
                className="form-control"
                value={user.contactNo}
                onChange={(e) => setUser({ ...user, contactNo: e.target.value })}
              />
            </div>
            <button className="btn btn-primary" onClick={handleUpdateProfile}>
              Save Changes
            </button>
          </div>
        </div>

        {/* Right: Profile Picture */}
        <div className="col-md-4 text-center">
          <h5 className="text-start">Profile Picture</h5>
          <div className="position-relative d-inline-block">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="rounded-circle border"
                width="150"
                height="150"
              />
            ) : (
              <div
                className="rounded-circle d-flex align-items-center justify-content-center bg-secondary"
                style={{ width: "150px", height: "150px" }}
              >
                <i className="fas fa-user fa-3x text-light"></i>
              </div>
            )}

            {/* Edit Button */}
            <button
              className="btn btn-dark btn-sm position-absolute bottom-0 start-50"
              style={{ transform: "translateX(-50%)" }}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <i className="fas fa-pencil-alt me-1"></i> Edit
            </button>

            {/* Dropdown for Upload/Remove */}
            {showDropdown && (
              <div
                className="dropdown-menu show w-100 text-center mt-2"
                style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}
              >
                <button className="dropdown-item" onClick={() => fileInputRef.current.click()}>
                  Upload a photo
                </button>
                <button className="dropdown-item text-danger" onClick={handleRemoveImage}>
                  Remove photo
                </button>
              </div>
            )}

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleUploadImage}
            />
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card p-3">
            <h4>Change Password</h4>
            <div className="mb-3">
              <label className="form-label">Old Password</label>
              <input
                type="password"
                className="form-control"
                value={password.oldPassword}
                onChange={(e) => setPassword({ ...password, oldPassword: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                value={password.newPassword}
                onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={password.confirmPassword}
                onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
              />
            </div>
            <button className="btn btn-success" onClick={handleChangePassword}>
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
