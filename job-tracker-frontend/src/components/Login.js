import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import { login } from "../services/api";
import { useAppContext } from "../AppContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setUser } = useAppContext(); // Use Context API
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(formData);
      localStorage.setItem("token", data.token);
      setUser(data.user); // Update user in context
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Login failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-6">
      <div className="bg-gray-800/90 backdrop-blur-md shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-white text-center mb-8">
          Welcome Back
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 font-medium hover:underline"
            >
              Signup
            </Link>
          </p>
          <p className="text-sm text-gray-400 mt-2">
            <Link
              to="/admin-login"
              className="text-blue-400 font-medium hover:underline"
            >
              Login as Admin
            </Link>
          </p>
        </div>
        <div className="mt-6">
          <hr className="border-gray-700" />
          <p className="text-sm text-gray-400 text-center mt-4">
            &copy; {new Date().getFullYear()} Job Tracker. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
