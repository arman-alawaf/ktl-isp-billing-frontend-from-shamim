// import React from 'react';

// const DashboardStats = () => {
//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold text-white mb-6">Dashboard Stats</h1>
//       <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
//         <p className="text-white">I am here.</p>
//       </div>
//     </div>
//   );
// };

// export default DashboardStats;



import React, { useEffect, useState } from "react";
import api from "../services/api"; // make sure this points to your axios instance

const DashboardStats = ({ showOnly }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/dashboard/stats"); 
        // 👆 replace with your real API endpoint
        setStats(response.data.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (!stats) {
    return <p className="text-red-500">No data available</p>;
  }

  // show only selected field (like "id")
  if (showOnly && stats[showOnly] !== undefined) {
    return (
      <div className="p-4 bg-gray-800 text-white rounded-lg">
        <h3 className="text-lg font-semibold">{showOnly.toUpperCase()}</h3>
        <p>{stats[showOnly]}</p>
      </div>
    );
  }

  // fallback full stats view
  return (
    <div className="grid grid-cols-3 gap-4">
      {Object.keys(stats).map((key) => (
        <div key={key} className="p-4 bg-gray-800 text-white rounded-lg">
          {key}: {stats[key]}
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
