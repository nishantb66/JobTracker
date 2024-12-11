import React, { useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../AppContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const AdminDashboard = () => {
  const { users, setUsers } = useAppContext(); // Use context
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/admin/users"
        );
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [setUsers]);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
      setUsers(users.filter((user) => user._id !== id)); // Update state
      alert("User deleted successfully");
    } catch (error) {
      alert("Failed to delete user");
      console.error("Error deleting user:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear any stored token
    navigate("/login"); // Redirect to user login page
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-white">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <table className="min-w-full bg-gray-800 text-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-700">Name</th>
            <th className="py-2 px-4 border-b border-gray-700">Email</th>
            <th className="py-2 px-4 border-b border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b border-gray-700">
                  {user.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-700">
                  {user.email}
                </td>
                <td className="py-2 px-4 border-b border-gray-700">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
