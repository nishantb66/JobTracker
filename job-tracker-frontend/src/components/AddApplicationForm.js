import React, { useState } from "react";
import { addApplication } from "../services/api";

const AddApplicationForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    status: "Applied",
    dateApplied: "",
    notes: "",
  });



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addApplication(formData); // Using addApplication here
      alert("Application added successfully!");
      // Reset the form
      setFormData({
        jobTitle: "",
        companyName: "",
        status: "Applied",
        dateApplied: "",
        notes: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to add application.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/90 backdrop-blur-lg shadow-2xl rounded-2xl p-6 sm:p-8 lg:p-10 w-full max-w-2xl overflow-y-auto"
        style={{ maxHeight: "90vh" }} // Prevent form from overflowing
      >
        <h1 className="text-3xl font-bold text-gray-100 text-center mb-6 sm:mb-8">
          Add Job Application
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="jobTitle"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Job Title
            </label>
            <input
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-lg bg-gray-700 text-gray-200 focus:ring-4 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter job title"
            />
          </div>
          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Company Name
            </label>
            <input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-lg bg-gray-700 text-gray-200 focus:ring-4 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter company name"
            />
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-gray-700 text-gray-200 focus:ring-4 focus:ring-blue-500 focus:outline-none"
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offered">Offered</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="dateApplied"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Date Applied
            </label>
            <input
              id="dateApplied"
              type="date"
              name="dateApplied"
              value={formData.dateApplied}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-gray-700 text-gray-200 focus:ring-4 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-6">
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-gray-700 text-gray-200 focus:ring-4 focus:ring-blue-500 focus:outline-none"
            placeholder="Add notes (optional)"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full mt-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:opacity-90 transition focus:ring-4 focus:ring-blue-400 focus:outline-none"
        >
          Add Application
        </button>
      </form>
    </div>
  );
};

export default AddApplicationForm;
