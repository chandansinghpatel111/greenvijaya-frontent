// src/Pages/Dashboard.js
// import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem('currentUser');
      navigate("/login"); // Redirect to login page after logging out
    } catch (err) {
      console.error("Error signing out: ", err);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
