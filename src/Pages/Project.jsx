// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
// src/data/projects.js




export const projects = [
    {
      id: 1,
      title: "Lucknow Faizabad Road",
      description: "Residential, Commercial property Plots, Agricultural Farm lands.",
      url: "lucknow-faizabad-road",
      images: ["/public/our7.jpeg", "/public/Lucknow.jpg"],
      about: "A perfect blend of modern living and natural serenity.",
      details: {
        location: "Lucknow, Uttar Pradesh",
        projectType: "Residential and Commercial",
        amenities: ["24/7 Security", "Road Connectivity"],
        priceRange: "₹20 Lakh - ₹50 Lakh",
      },
    },
  ];
const CreateProjectPage = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Project Data:", formData);
    // Add logic to send data to an API or further processing here
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Create Project</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Project Name
          </label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProjectPage;
