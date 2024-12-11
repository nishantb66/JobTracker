import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { updateApplication, fetchApplications } from "../services/api";

const EditApplicationForm = ({ applicationId, onApplicationUpdated }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    status: "Applied",
    dateApplied: "",
    notes: "",
  });

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        const { data } = await fetchApplications();
        const app = data.find((app) => app._id === applicationId);
        if (app) setFormData(app);
      } catch (error) {
        console.error("Error fetching application details:", error);
      }
    };

    fetchApplicationDetails();
  }, [applicationId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateApplication(applicationId, formData);
      const updatedApplication = response.data.application;
      if (updatedApplication) {
        onApplicationUpdated(updatedApplication); // Notify parent component about the update
        navigate("/ApplicationList"); // Redirect to the application list page
      }
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-100">Edit Application</h1>
      <div>
        <label className="block text-gray-300">Job Title:</label>
        <input
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          required
          className="w-full p-2 rounded-md bg-gray-800 text-gray-100"
        />
      </div>
      <div>
        <label className="block text-gray-300">Company Name:</label>
        <input
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
          className="w-full p-2 rounded-md bg-gray-800 text-gray-100"
        />
      </div>
      <div>
        <label className="block text-gray-300">Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-gray-800 text-gray-100"
        >
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offered">Offered</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-300">Date Applied:</label>
        <input
          type="date"
          name="dateApplied"
          value={formData.dateApplied}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-gray-800 text-gray-100"
        />
      </div>
      <div>
        <label className="block text-gray-300">Notes:</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-gray-800 text-gray-100"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Update Application
      </button>
    </form>
  );
};

export default EditApplicationForm;
