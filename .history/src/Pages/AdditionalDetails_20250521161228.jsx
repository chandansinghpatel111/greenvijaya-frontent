import { useState, useEffect } from "react";

export default function AdditionalDetails({ formData, setFormData, nextStep, prevStep }) {
  const [facingType, setFacingType] = useState(formData.facingType || "");

  const handleFacingTypeChange = (e) => {
    setFacingType(e.target.value);
  };

  useEffect(() => {
    // Sync facingType with formData
    setFormData({ ...formData, facingType });
  }, [facingType]);

  return (

    <div className="min-h-screen bg-gray-50 opacity-50  px-4 py-6 flex justify-center">

      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-center">Additional Details</h2>

        {/* Facing Type Selection */}
        <div className="mt-6">

          <label className="block text-gray-900 font-medium">Facing Type</label>

          <select
            value={facingType}
            onChange={handleFacingTypeChange}
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

        {/* Navigation Buttons */}
       
      </div>
    </div>
  );
}
