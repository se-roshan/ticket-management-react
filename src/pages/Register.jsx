import React, { useState } from "react";
import { registerUser } from "../services/apiService";
import InputField from "../components/InputField";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    password: "",
    gender: "",
    dob: "",
    isActive: true
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <InputField label="Name" type="text" name="name" value={formData.name} onChange={handleChange} />
        <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
        <InputField label="Contact No" type="text" name="contactNo" value={formData.contactNo} onChange={handleChange} />
        <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
        <InputField label="Gender" type="text" name="gender" value={formData.gender} onChange={handleChange} />
        <InputField label="Date of Birth" type="date" name="dob" value={formData.dob} onChange={handleChange} />
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
