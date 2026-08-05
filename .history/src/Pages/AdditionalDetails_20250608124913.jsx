import { useState, useEffect } from "react";

export default function AdditionalDetails({ formData, setFormData, nextStep, prevStep }) {
  const [facingType, setFacingType] = useState(formData.facingType || "");
  const [contactNumber, setContactNumber] = useState(formData.contactNumber || "");

  useEffect(() => {
    // Sync facingType and contactNumber with formData
    setFormData((prev) => ({
      ...prev,
      facingType,
      contactNumber,
    }));
  }, [facingType, contactNumber]);

  return (
    <div className="min-h-screen bg-gray-50 opacity-50 px-4 py-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-center">Additional Details</h2>

        {/* Facing Type Selection */}
        <div className="mb-6">
          <label className="block text-gray-900 font-medium">Facing Type</label>
          <select
            value={facingType}
            onChange={(e) => setFacingType(e.target.value)}
            className="w-full p-2 border rounded-md mt-2"
          >
            <option value="">Select Facing Type</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="North-East">North-East</option>
            <option value="North-West">North-West</option>
            <option value="South-East">South-East</option>
            <option value="South-West">South-West</option>
          </select>
        </div>

        {/* Contact Number Input */}
        <div className="mb-6">
          <label className="block text-gray-900 font-medium">Contact Number</label>
          <input
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Enter your contact number"
            className="w-full p-2 border rounded-md mt-2"
          />
        </div>

        {/* Navigation Buttons (optional if you want them here) */}
      </div>
    </div>
  );
}
