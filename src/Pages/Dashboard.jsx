// src/Pages/Dashboard.js
// import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
