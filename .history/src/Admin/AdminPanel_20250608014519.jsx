import { useState } from "react";

const Buys = () => {
  const [formData, setFormData] = useState({
    propertyType: "",
    location: "",
    price: "",
    area: "",
    description: "",
    contactName: "",
    contactNumber: "",
    images: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Property Submitted Successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-bold text-center text-[#ec9322] mb-6">
        Buys
      </h2>

      {/* 🔽 Form Section */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Property Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="propertyType"
            placeholder="Property Type (e.g., Apartment, Villa)"
            className="p-2 border rounded w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="p-2 border rounded w-full"
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            className="p-2 border rounded w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            name="area"
            placeholder="Area (sq. ft.)"
            className="p-2 border rounded w-full"
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Property Description"
          className="p-2 border rounded w-full h-24"
          onChange={handleChange}
        ></textarea>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-2">Upload Images:</label>
          <input
            type="file"
            multiple
            accept="image/*"
            className="w-full border p-2 rounded"
            onChange={handleImageUpload}
          />
        </div>

        {/* Contact Details */}
        <h3 className="text-lg font-bold">Contact Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="contactName"
            placeholder="Your Name"
            className="p-2 border rounded w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            className="p-2 border rounded w-full"
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#ec9322] text-white p-3 rounded hover:bg-[#d77d10]"
        >
          Submit Project
        </button>
      </form>
    </div>
  );
};

export default Buys;
