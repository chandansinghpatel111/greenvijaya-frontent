// src/Pages/Dashboard.js
// import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();

console.log(auth, "sss")
  const handleLogout = async () => {
    try {
      await signOut(auth);
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
