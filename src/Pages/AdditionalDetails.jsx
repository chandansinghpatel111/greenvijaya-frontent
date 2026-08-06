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
    <div className="w-full space-y-6">
      {/* Facing Type Selection */}
      <div>
        <label className="block text-gray-900 font-medium">Facing Type</label>
        <select
          value={facingType}
          onChange={(e) => setFacingType(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-[#ec9322]"
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
      <div>
        <label className="block text-gray-900 font-medium">Contact Number</label>
        <input
          type="tel"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          placeholder="Enter your contact number"
          className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-[#ec9322]"
        />
      </div>
    </div>
  );
}
