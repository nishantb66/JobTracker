import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddApplicationForm from "./components/AddApplicationForm";
import ApplicationList from "./components/ApplicationList";
import AdminLogin from "./components/AdminLogin"; // Import AdminLogin
import AdminDashboard from "./components/AdminDashboard"; // Import AdminDashboard
import { useAppContext } from "./AppContext"; // Import Context

const App = () => {
  const { user, setUser } = useAppContext(); // Use Context for global state

  // Logout Functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null); // Clear user from context
  };

  

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
        {/* Navigation Bar */}
        <nav className="bg-gray-800 py-4 shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-6 flex justify-between items-center">
            {/* Brand Logo */}
            <div className="text-2xl font-bold text-teal-400 hover:text-teal-500 transition">
              <Link to="/">Job Tracker</Link>
            </div>
            {/* Navigation Links */}
            <ul className="flex items-center space-x-6">
              {user ? (
                <>
                  <li>
                    <Link
                      to="/"
                      className="text-gray-300 hover:text-white transition text-lg"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-md hover:opacity-90 shadow-lg transition"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/signup"
                      className="text-gray-300 hover:text-white transition text-lg"
                    >
                      Signup
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow-lg transition"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>

        {/* Content Area */}
        <div className="flex-grow container mx-auto px-6 py-8">
          <Routes>
            {user ? (
              <>
                <Route path="/" element={<Dashboard user={user} />} />
                <Route path="/add" element={<AddApplicationForm />} />
                <Route path="/applications" element={<ApplicationList />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
