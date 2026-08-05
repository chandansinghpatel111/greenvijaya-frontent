import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function PropertyPost() {
  const [propertyCategory, setPropertyCategory] = useState("Residential");
  const [propertyType, setPropertyType] = useState("");
  const [listingType, setListingType] = useState("PG");
  const [formData, setFormData] = useState({
    title: "",
    heading: "",
    description: "",
    location: "",
    price: "",
  });
  const [projects, setProjects] = useState([]);

  const propertyTypes = {
    Residential: [
      "Flat/Apartment",
      "Independent House/Villa/Builder",
      "Plot/Land",
      "1 RK/Studio Apartment",
      "Serviced Apartment",
      "Farmhouse",
    ],
    Commercial: [
      "Office",
      "Retail",
      "Plot/Land",
      "Storage",
      "Industry",
      "Hospitality",
    ],
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectsList);
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!propertyType) {
      alert("Please select a property type!");
      return;
    }
    try {
      const projectRef = collection(db, "projects");
      await addDoc(projectRef, {
        ...formData,
        propertyType,
        propertyCategory,
        listingType,
      });
      setFormData({ title: "", heading: "", description: "", location: "", price: "" });
      setPropertyType(""); // Reset selection
      fetchProjects();
      alert("Property listed successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-orange-50 px-4 py-8 md:px-12 space-y-6 md:space-y-0 md:space-x-12">
      
      {/* Left Section */}
      <div className="w-full md:w-1/2 p-6 text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-snug">
          Sell or Rent your Property <span className="text-blue-600">online faster</span> with Usdunique.com
        </h1>
        <ul className="mt-6 text-lg text-gray-700 space-y-2">
          <li className="flex items-center justify-center md:justify-start">✅ Advertise for FREE</li>
          <li className="flex items-center justify-center md:justify-start">✅ Get unlimited enquiries</li>
          <li className="flex items-center justify-center md:justify-start">✅ Get shortlisted buyers and tenants</li>
          <li className="flex items-center justify-center md:justify-start">✅ Assistance in coordinating site visits</li>
        </ul>
      </div>

      {/* Right Section - Form */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-center">Start posting your property, it's free</h2>

        {/* Listing Type Selection */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-4">
          {["Sell", "Rent / Lease", "PG"].map((type) => (
            <button
              key={type}
              className={`w-24 md:w-32 px-3 py-2 rounded-lg border transition duration-200 ${
                listingType === type ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setListingType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Property Category Selection */}
        <h3 className="text-gray-700 mb-2 text-center">And it's a ...</h3>
        <div className="flex justify-center gap-2 md:gap-3 mb-4">
          {["Residential", "Commercial"].map((category) => (
            <button
              key={category}
              className={`w-32 px-3 py-2 rounded-lg border transition duration-200 ${
                propertyCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setPropertyCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Property Type Selection */}
        <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 w-full">
          {propertyTypes[propertyCategory].map((type) => (
            <button
              key={type}
              className={`px-3 py-2 text-sm md:text-base rounded-lg border transition duration-200 ${
                propertyType === type ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setPropertyType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Form Fields */}
        <div className="w-full space-y-3">
          {["title", "heading", "description", "location", "price"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg text-sm md:text-base"
              required
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 mt-4"
          onClick={handleSubmit}
        >
          Start Now
        </button>
      </div>
    </div>
  );
}
