// Profile.jsx

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  uploadProfile,
  removeProfile,
} from "../../features/user/userActions";
import InputField from "../../components/InputField"; // InputField component
import { Tooltip } from "bootstrap";
import "../../styles/tooltip.css"; // ✅ Import custom tooltip styles
import $ from "jquery"; // ✅ Import jQuery First
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.full.min.js"; // ✅ Import full version

import SelectField from "../../components/SelectField";

function Profile() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const fileInputRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [uploading, setUploading] = useState(false); // Track image upload progress
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [btnTitle, setbtnTitle] = useState("");
  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  // ✅ Initialize state with empty values to prevent uncontrolled inputs
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    contactNo: "",
  });

  // Fetch user details on page load
  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  // Populate userData when user info is available
  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || "",
        email: user.email || "",
        contactNo: user.contactNo || "",
      });
    }
  }, [user]);

  // ✅ Function to update tooltip dynamically
  const updateTooltip = (data) => {
    let title = "";
    if (!data.name.trim()) title += "Please Enter Employee Name\n";
    if (!data.contactNo.trim()) title += "Please Enter Mobile No\n";
    if (!data.email.trim()) title += "Please Enter Email ID\n";

    setbtnTitle(title.trim());
  };

  // ✅ Ensure tooltip updates when userData changes
  useEffect(() => {
    updateTooltip(userData);
  }, [userData]);

  // useEffect(() => {
  //   // Apply Select2 to all selects with class .select2
  //   $(".select2").select2({
  //     width: "100%",
  //     placeholder: "Select an option",
  //     allowClear: true,
  //   });
  // }, []);

  // Handle Input Change
  const handleChange = (e) => {
    //setUserData({ ...userData, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    const updatedData = { ...userData, [name]: value };
    setUserData(updatedData);

    // Update tooltip dynamically
    updateTooltip(updatedData);
  };

  // Handle Image Upload
  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true); // ✅ Show loading state
      try {
        await dispatch(uploadProfile(file)); // ✅ Upload Image
        await dispatch(getUserDetails()); // ✅ Fetch updated details after upload
      } catch (error) {
        console.error("Image upload failed:", error);
      }
      setUploading(false);
      setShowDropdown(false);
    }
  };

  // Handle Remove Image
  const handleRemoveImage = async () => {
    if (window.confirm("Are you sure you want to remove your profile image?")) {
      setUploading(true);
      await dispatch(removeProfile());
      await dispatch(getUserDetails()); // ✅ Refresh user details after removing image
      setUploading(false);
      setShowDropdown(false);
    }
  };

  // Handle Save Changes
  const handleSave = async () => {
    console.log("Saving User Data:", userData);
    setIsEditing(false); // Disable editing after saving
  };

  // Handle Cancel Changes
  const handleCancel = () => {
    console.log("Cancel and reset user default User Data:", user);
    setUserData({
      name: user?.name || "",
      email: user?.email || "",
      contactNo: user?.contactNo || "",
    });
    setIsEditing(false); // Disable editing after canceling
  };

  return (
    <div className="container mt-4 mb-5">
      <h3>Public Profile</h3>
      {loading ? ( // ✅ Show loading while fetching user data
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {/* User Info */}
          <div className="col-md-8">
            <div className="card p-3">
              <div className="row">
                {/* For User Name */}
                <div className="col-md-6">
                  <InputField
                    label="Name"
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                {/* For User Email */}
                <div className="col-md-6">
                  <InputField
                    label="Email"
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                {/* For User Conatct No */}
                <div className="col-md-4">
                  <InputField
                    label="Contact No"
                    type="text"
                    name="contactNo"
                    value={userData.contactNo}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                {/* For User Gender with Select2 */}
                <div className="col-md-4">
                  {/* <SelectField
                    label="Gender"
                    name="gender"
                    value={userData.gender}
                    onChange={handleChange}
                    options={genderOptions}
                  /> */}
                  {/* Gender Select Field */}
                  <SelectField
                    label="Gender"
                    name="gender"
                    value={userData.gender}
                    onChange={handleChange}
                    className="select2" // ✅ Add class to apply Select2
                    // options={[
                    //   { value: "Male", label: "Male" },
                    //   { value: "Female", label: "Female" },
                    //   { value: "Other", label: "Other" },
                    // ]}
                    options={genderOptions}
                  />
                </div>
              </div>

              {/* Edit & Save Button */}
              <div className="row">
                <div className=" d-flex align-items-center">
                  {isEditing ? (
                    <>
                      {btnTitle ? (
                        // ✅ Wrapping disabled button inside a <span> to show tooltip
                        <span data-title={btnTitle} className="tooltip-wrapper">
                          <button
                            type="button"
                            className="btn btn-secondary disabled"
                          >
                            <i className="fas fa-save me-1"></i> Save
                          </button>
                        </span>
                      ) : (
                        <button
                          className="btn btn-success"
                          onClick={handleSave}
                        >
                          <i className="fas fa-save me-1"></i> Save
                        </button>
                      )}
                      <button
                        className="btn btn-warning ms-2"
                        onClick={handleCancel}
                        data-bs-toggle="tooltip"
                        data-bs-title="Cancel and Reset"
                      >
                        <i className="fas fa-times me-1"></i> Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditing(true)}
                    >
                      <i className="fas fa-edit me-1"></i> Edit User Info
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="col-md-4 text-center">
            <h5 className="text-start">Profile Picture</h5>
            <div className="position-relative d-inline-block">
              {uploading ? ( // Show loading while uploading image
                <div
                  className="rounded-circle bg-light d-flex align-items-center justify-content-center border"
                  style={{ width: "150px", height: "150px" }}
                >
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Uploading...</span>
                  </div>
                </div>
              ) : user?.profileImage ? (
                <img
                  src={user.profileImage} // Using API-provided image URL
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
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <button
                    className="dropdown-item"
                    onClick={() => fileInputRef.current.click()}
                  >
                    Upload a photo
                  </button>
                  {user?.profileImage && (
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleRemoveImage}
                    >
                      Remove photo
                    </button>
                  )}
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
      )}
    </div>
  );
}

export default Profile;
