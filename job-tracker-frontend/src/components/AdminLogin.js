import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        formData
      );
      alert(response.data.message);
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-3xl font-semibold text-white text-center mb-6">
          Admin Login
        </h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Username
          </label>
          <input
            name="username"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-gray-700 text-gray-200"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-gray-700 text-gray-200"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
