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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Facing Type Selection */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Facing Type</label>
          <select
            value={facingType}
            onChange={(e) => setFacingType(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#753441]/10 focus:border-[#753441] transition-all bg-gray-50/50"
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
          <label className="block text-sm font-bold text-gray-700 mb-2">Contact Number</label>
          <input
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Enter contact number"
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#753441]/10 focus:border-[#753441] transition-all bg-gray-50/50"
          />
        </div>
      </div>
    </div>
  );
}
