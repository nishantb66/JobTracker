import React, { useState } from "react";
import { signup } from "../services/api";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      alert("Signup successful! Please login.");
    } catch (error) {
      console.error(error);
      alert("Signup failed.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-gray-800 to-gray-900">
      <div className="flex flex-col md:flex-row bg-gray-800/90 shadow-xl rounded-xl overflow-hidden w-full max-w-5xl">
        {/* Left Section: Info */}
        <div className="flex-1 p-10 text-white flex flex-col justify-center bg-gradient-to-br from-gray-800 to-gray-900">
          <h1 className="text-4xl font-bold mb-4">Welcome to Job Tracker</h1>
          <p className="text-lg text-gray-400 mb-6">
            Join our platform to streamline and organize your job application
            journey effortlessly.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center">
              <span className="bg-blue-500 p-2 rounded-full mr-4">
                <svg
                  className="w-5 h-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m2 0a9 9 0 11-6.364-15.364A9 9 0 0121 12z"
                  />
                </svg>
              </span>
              Track job applications easily
            </li>
            <li className="flex items-center">
              <span className="bg-blue-500 p-2 rounded-full mr-4">
                <svg
                  className="w-5 h-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M16.21 12.83a3.001 3.001 0 00-4.42 0"
                  />
                </svg>
              </span>
              Manage your job applications
            </li>
            <li className="flex items-center">
              <span className="bg-blue-500 p-2 rounded-full mr-4">
                <svg
                  className="w-5 h-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-3-8v16"
                  />
                </svg>
              </span>
              Visualize and simplify your workflow
            </li>
          </ul>
        </div>

        {/* Right Section: Form */}
        <div className="flex-1 bg-gray-900 p-10">
          <h2 className="text-3xl font-bold text-blue-400 text-center mb-6">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter a secure password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              Create Account
            </button>
          </form>
          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-400 font-medium hover:underline"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
