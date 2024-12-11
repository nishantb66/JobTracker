import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchApplications } from "../services/api";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = ({ user }) => {
  const [statusCounts, setStatusCounts] = useState({});
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const { data } = await fetchApplications();

        // Calculate status counts
        const counts = data.reduce((acc, app) => {
          acc[app.status] = (acc[app.status] || 0) + 1;
          return acc;
        }, {});
        setStatusCounts(counts);

        // Prepare chart data
        const statuses = Object.keys(counts);
        const values = Object.values(counts);
        setChartData({
          labels: statuses,
          datasets: [
            {
              data: values,
              backgroundColor: [
                "#EF4444", // Rejected
                "#FBBF24", // Applied
                "#10B981", // Offered
                "#3B82F6", // Interviewing
              ],
              hoverBackgroundColor: [
                "#DC2626",
                "#D97706",
                "#059669",
                "#2563EB",
              ],
              borderColor: "#374151",
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    loadApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 px-8 py-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Welcome Section */}
        <header className="text-center mb-10">
          <h1 className="text-5xl font-bold text-blue-400 mb-4">
            Welcome, {user.name}
          </h1>
          <p className="text-lg text-gray-300">
            Stay on top of your job applications with insightful statistics and
            an intuitive interface.
          </p>
        </header>

        {/* Actions Section */}
        <section className="text-center mb-10">
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/add"
              className="px-10 py-4 text-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:opacity-90 transform hover:scale-105 transition"
            >
              Add New Application
            </Link>
            <Link
              to="/applications"
              className="px-10 py-4 text-lg font-medium bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-lg shadow-md hover:opacity-90 transform hover:scale-105 transition"
            >
              View Applications
            </Link>
          </div>
        </section>

        {/* Application Status Summary Section */}
        <section>
          <h2 className="text-3xl font-bold text-blue-400 text-center mb-8">
            Application Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div
                key={status}
                className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl transition"
              >
                <span className="text-lg font-medium capitalize text-gray-300">
                  {status}
                </span>
                <span className="text-4xl font-bold text-blue-400">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Pie Chart Section */}
        {chartData && (
          <section className="bg-gradient-to-br from-gray-800 to-gray-700 p-10 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-blue-400 text-center mb-8">
              Status Distribution
            </h2>
            <div
              className="w-full max-w-3xl mx-auto"
              style={{ height: "500px" }}
            >
              <Pie
                data={chartData}
                options={{
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        color: "#E5E7EB",
                        font: {
                          size: 16,
                        },
                      },
                    },
                    tooltip: {
                      backgroundColor: "#1F2937",
                      titleColor: "#F9FAFB",
                      bodyColor: "#D1D5DB",
                      cornerRadius: 6,
                    },
                  },
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
