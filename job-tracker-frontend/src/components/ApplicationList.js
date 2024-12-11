import React, { useEffect, useState } from "react";
import {
  fetchApplications,
  deleteApplication,
  updateApplication,
} from "../services/api";

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    companyName: "",
    jobTitle: "",
  });
  const [sortOrder, setSortOrder] = useState("desc"); // Default sort order is descending
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    jobTitle: "",
    companyName: "",
    status: "",
    dateApplied: "",
    notes: "",
  });

  // Fetch applications and sort them by the latest date
  useEffect(() => {
    const loadApplications = async () => {
      try {
        const { data } = await fetchApplications();

        // Sort applications by the latest date applied
        const sortedData = data.sort(
          (a, b) => new Date(b.dateApplied) - new Date(a.dateApplied)
        );

        setApplications(sortedData);
        setFilteredApplications(sortedData);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    loadApplications();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });

    const filtered = applications.filter((app) => {
      return (
        (filters.status === "" ||
          app.status.toLowerCase().includes(value.toLowerCase())) &&
        (filters.companyName === "" ||
          app.companyName.toLowerCase().includes(value.toLowerCase())) &&
        (filters.jobTitle === "" ||
          app.jobTitle.toLowerCase().includes(value.toLowerCase()))
      );
    });

    setFilteredApplications(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await deleteApplication(id);
      const updatedApplications = applications.filter((app) => app._id !== id);
      setApplications(updatedApplications);
      setFilteredApplications(updatedApplications);
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  const handleEdit = (app) => {
    setEditingId(app._id);
    setEditFormData({
      jobTitle: app.jobTitle,
      companyName: app.companyName,
      status: app.status,
      dateApplied: app.dateApplied,
      notes: app.notes,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSave = async (id) => {
    try {
      const response = await updateApplication(id, editFormData);
      const updatedApp = response.data;

      if (!updatedApp || !updatedApp._id) {
        console.error("Invalid application response:", response.data);
        return;
      }

      const updatedApplications = [
        updatedApp,
        ...applications.filter((app) => app._id !== id),
      ].sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied));

      setApplications(updatedApplications);
      setFilteredApplications(updatedApplications);
      setEditingId(null);
      setEditFormData({
        jobTitle: "",
        companyName: "",
        status: "",
        dateApplied: "",
        notes: "",
      });
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);

    const sortedApplications = [...filteredApplications].sort((a, b) =>
      newOrder === "asc"
        ? new Date(a.dateApplied) - new Date(b.dateApplied)
        : new Date(b.dateApplied) - new Date(a.dateApplied)
    );

    setFilteredApplications(sortedApplications);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">
        Job Applications
      </h1>

      {/* Filter Section */}
      <div className="mb-10 bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold text-teal-400 mb-4">
          Filter Applications
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            placeholder="Status"
            className="p-4 bg-gray-700 text-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <input
            name="companyName"
            value={filters.companyName}
            onChange={handleFilterChange}
            placeholder="Company Name"
            className="p-4 bg-gray-700 text-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <input
            name="jobTitle"
            value={filters.jobTitle}
            onChange={handleFilterChange}
            placeholder="Role"
            className="p-4 bg-gray-700 text-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <button
          onClick={toggleSortOrder}
          className="mt-4 px-4 py-2 text-sm bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full shadow-md hover:shadow-lg transition-transform hover:scale-105"
        >
          {sortOrder === "asc"
            ? "Sort by date: Newest to Oldest"
            : "Sort by date: Oldest to Newest"}
        </button>
      </div>

      {/* Applications List */}
      <ul className="space-y-6 w-full max-w-4xl mx-auto">
        {filteredApplications.map((app) => (
          <li
            key={app._id}
            className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-transform hover:scale-105"
          >
            {editingId === app._id ? (
              <form className="w-full">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="jobTitle"
                    value={editFormData.jobTitle}
                    onChange={handleEditChange}
                    className="p-4 bg-gray-700 text-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    name="companyName"
                    value={editFormData.companyName}
                    onChange={handleEditChange}
                    className="p-4 bg-gray-700 text-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    name="status"
                    value={editFormData.status}
                    onChange={handleEditChange}
                    className="p-4 bg-gray-700 text-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offered">Offered</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <input
                    type="date"
                    name="dateApplied"
                    value={editFormData.dateApplied}
                    onChange={handleEditChange}
                    className="p-4 bg-gray-700 text-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    name="notes"
                    value={editFormData.notes}
                    onChange={handleEditChange}
                    className="p-4 bg-gray-700 text-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 col-span-2"
                    placeholder="Notes"
                  ></textarea>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => handleSave(app._id)}
                    className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-teal-400">
                    {app.jobTitle} at {app.companyName}
                  </p>
                  <p className="text-sm text-gray-400">
                    Date Applied: {new Date(app.dateApplied).toDateString()}
                  </p>
                  <p className="text-sm text-gray-400">{app.status}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(app)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(app._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationList;
