// Profile.jsx
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  uploadProfile,
  removeProfilePicture,
  updateProfileDetails,
  changePassword,
} from "../../features/user/userActions";
import InputField from "../../components/InputField"; // InputField component
import { Tooltip } from "bootstrap";
import "../../styles/tooltip.css"; // Import custom tooltip styles
import $ from "jquery"; // Import jQuery First
import SelectField from "../../components/SelectField";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  // References
  const fileInputRef = useRef(null);

  // UI State Management
  const [showDropdown, setShowDropdown] = useState(false);
  const [uploading, setUploading] = useState(false); // Track image upload progress
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [updating, setUpdating] = useState(false);
  const [btnTitle, setbtnTitle] = useState("");
  const [btnPasswordTitle, setbtnPasswordTitle] = useState("");

  // Gender Dropdown Options
  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  // Initialize state with empty values to prevent uncontrolled inputs
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    contactNo: "",
    gender: "",
  });

  const [showPasswordFields, setShowPasswordFields] = useState(false); // Toggle Password Inputs
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false); // Toggle Password Visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle Password Visibility
  const [passwordError, setPasswordError] = useState(""); // Store validation error

  // Fetch user details on page load (component mount)
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
        gender: user.gender || "", // Added gender field
      });
    }
  }, [user]);

  // Enable or disable gender dropdown dynamically
  useEffect(() => {
    $("#gender").prop("disabled", !isEditing).trigger("change");
  }, [isEditing]);

  // Update tooltip messages dynamically based on input values
  const updateTooltip = (data) => {
    let title = "";
    //-- way 1
    title =
      (!data.name.trim() ? "Please Enter Employee Name" + "\n" : "") +
      (!data.contactNo.trim() ? "Please Enter Mobile No" + "\n" : "") +
      (!data.email.trim() ? "Please Enter Email ID" + "\n" : "") +
      (!data.gender || data.gender === "Select Gender"
        ? "Please Select Gender" + "\n"
        : "");

    setbtnTitle(title.trim());
  };

  // Ensure tooltip updates when userData changes
  useEffect(() => {
    updateTooltip(userData);
  }, [userData]);

  // Handle form Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...userData, [name]: value };
    setUserData(updatedData);

    // Update tooltip dynamically
    updateTooltip(updatedData);
  };

  // Handle profile image upload
  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true); // Show loading state
      try {
        await dispatch(uploadProfile(file)); // Upload Image
        await dispatch(getUserDetails()); // Fetch updated details after upload
      } catch (error) {
        console.error("Image upload failed:", error);
      }
      setUploading(false);
      setShowDropdown(false);
    }
  };

  // Handle profile image removal
  const handleRemoveImage = async () => {
    if (window.confirm("Are you sure you want to remove your profile image?")) {
      setUploading(true);
      try {
        await dispatch(removeProfilePicture(user.id)); // ✅ Pass user ID
      } catch (error) {
        console.error("Error removing profile image:", error);
      }
      setUploading(false);
      setShowDropdown(false);
    }
  };

  // Save updated user details
  const handleSave = async () => {
    setUpdating(true);
    try {
      const ParamsData = {
        id: user.id,
        name: userData.name,
        email: userData.email,
        contactNo: userData.contactNo,
        gender: userData.gender || user.gender, // Ensure gender is included
        dob: user.dob,
        isActive: user.isActive,
      };
      console.log("Updating Data ", ParamsData);

      await dispatch(updateProfileDetails(ParamsData)); // Corrected API Call
      await dispatch(getUserDetails()); // Refresh user details
    } catch (error) {
      console.log("Something went wrong ", error);
    }
    setUpdating(false);
    setIsEditing(false); // Disable editing mode after save
  };

  // Cancel editing and reset to previous user data
  const handleCancel = () => {
    console.log("Cancel and reset user default User Data:", user);
    setUserData({
      name: user?.name || "",
      email: user?.email || "",
      contactNo: user?.contactNo || "",
    });
    setIsEditing(false); // Disable editing after canceling
  };

  // Handle Password Input Change & Validation
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    const updatedPasswordData = { ...passwordData, [name]: value };
    setPasswordData(updatedPasswordData);

    // Update tooltip dynamically
    updatePasswordTooltip(updatedPasswordData);
  };

  // Ensure tooltip updates when passwordData changes
  useEffect(() => {
    updatePasswordTooltip(passwordData);
  }, [passwordData]);

  // Update tooltip messages dynamically based on input values
  const updatePasswordTooltip = (data) => {
    let title = "";
    title =
      (!data.password.trim() ? "Please Enter Password" + "\n" : "") +
      (!data.confirmPassword.trim()
        ? "Please Enter Confirm Password" + "\n"
        : "") +
      (data.password.trim() &&
      data.confirmPassword.trim() &&
      data.password !== data.confirmPassword
        ? "Passwords do not match!" + "\n"
        : "");
    setbtnPasswordTitle(title.trim());
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handle Password Update
  const handleUpdatePassword = async () => {
    setUpdating(true);
    try {
      await dispatch(changePassword(passwordData.password));
      alert("Password changed successfully!");
      setShowPasswordFields(false);
    } catch (error) {
      console.error("Error updating password:", error);
    }
    setUpdating(false);
  };

  return (
    <div className="container mt-4 mb-5">
      <div>
        <h3>Public Profile</h3>
        {loading ? ( // Show loading while fetching user data
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
                {updating ? (
                  <div>
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Updating...</span>
                    </div>
                  </div>
                ) : (
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
                      {/* Gender Select Field */}
                      <SelectField
                        label="Gender"
                        name="gender"
                        value={userData.gender}
                        onChange={handleChange}
                        options={genderOptions}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                )}
                {/* Edit & Save Button */}
                <div className="row">
                  <div className=" d-flex align-items-center">
                    {isEditing ? (
                      <>
                        {btnTitle ? (
                          // ✅ Wrapping disabled button inside a <span> to show tooltip
                          <span
                            data-title={btnTitle}
                            className="tooltip-wrapper"
                          >
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
                    style={{ width: "200px", height: "200px" }}
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
                    style={{ width: "200px", height: "200px" }}
                  >
                    <i className="fas fa-user fa-3x text-light"></i>
                  </div>
                )}

                {/* Edit Button */}
                <button
                  className="btn btn-dark btn-sm position-absolute bottom-0 start-50"
                  // style={{ transform: "translateX(-50%)" }}
                  style={{
                    transform: "translateX(-50%)",
                    left: "20% !important",
                    bottom: "0% !important",
                  }}
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
                        onClick={() => handleRemoveImage(user.id)}
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

      <div className="mt-2">
        <h3>Change Password</h3>
        {loading ? ( // Show loading while fetching user data
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
                {updating ? (
                  <div>
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Updating...</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    {showPasswordFields ? (
                      <div className="row">
                        <div className="col-md-6">
                          {/* <InputField
                            label="New Password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={passwordData.password}
                            onChange={handlePasswordChange}
                          /> */}
                          {/* for Password */}
                          <InputField
                            label="Password"
                            type={showPassword ? "text" : "password"} //Toggle Password Visibility
                            name="password"
                            value={passwordData.password}
                            onChange={handlePasswordChange}
                            placeholder="Enter  password"
                            rightIcon={showPassword ? faEyeSlash : faEye} // Show/Hide Icon
                            onRightIconClick={togglePasswordVisibility} // Toggle Function
                          />
                        </div>
                        <div className="col-md-6">
                          {/* <InputField
                            label="Confirm Password"
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                          /> */}
                           {/* for Password */}
                           <InputField
                            label="Confirm Password"
                            type={showConfirmPassword ? "text" : "password"} //Toggle Password Visibility
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            placeholder="Enter Confirm password"
                            rightIcon={showConfirmPassword ? faEyeSlash : faEye} // Show/Hide Icon
                            onRightIconClick={toggleConfirmPasswordVisibility} // Toggle Function
                          />
                        </div>

                        <div className=" d-flex align-items-center">
                          <>
                            {btnPasswordTitle ? (
                              // ✅ Wrapping disabled button inside a <span> to show tooltip
                              <span
                                data-title={btnPasswordTitle}
                                className="tooltip-wrapper"
                              >
                                <button
                                  type="button"
                                  className="btn btn-secondary disabled"
                                >
                                  <i className="fas fa-save me-1"></i> Update
                                </button>
                              </span>
                            ) : (
                              <button
                                className="btn btn-success"
                                onClick={handleUpdatePassword}
                              >
                                <i className="fas fa-save me-1"></i> Update
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
                        </div>
                      </div>
                    ) : (
                      <div className=" d-flex align-items-center">
                        <button
                          className="btn btn-primary"
                          onClick={() => setShowPasswordFields(true)}
                        >
                          Change Password
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
