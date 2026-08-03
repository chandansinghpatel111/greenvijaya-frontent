import { useState, useEffect } from "react";

export default function AdditionalDetails({ formData, setFormData }) {
  const [facingType, setFacingType] = useState(formData?.facingType || "");
  const [contactNumber, setContactNumber] = useState(formData?.contactNumber || "");

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      facingType,
      contactNumber,
    }));
  }, [facingType, contactNumber]);

  return (
    <div className="space-y-3.5 pt-1 text-slate-900">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Facing Type Selection */}
        <div>
          <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-300 mb-1.5 uppercase tracking-wide transition-colors duration-300">
            Property Facing Direction
          </label>
          <select
            value={facingType}
            onChange={(e) => setFacingType(e.target.value)}
            className="w-full p-2 text-xs font-bold bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-slate-950 dark:focus:border-rose-500 text-slate-900 dark:text-white transition-colors duration-300"
          >
            <option value="">Select Facing Direction</option>
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
          <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-300 mb-1.5 uppercase tracking-wide transition-colors duration-300">
            Administrator Contact Number
          </label>
          <input
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="e.g., +91 9876543210"
            className="w-full p-2 text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-slate-950 dark:focus:border-rose-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors duration-300"
          />
        </div>
        {/* State Input */}
        <div>
          <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-300 mb-1.5 uppercase tracking-wide transition-colors duration-300">
            State
          </label>
          <input
            type="text"
            value={formData?.state || ""}
            onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
            placeholder="e.g., Uttar Pradesh"
            className="w-full p-2 text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-slate-950 dark:focus:border-rose-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors duration-300"
          />
        </div>

        {/* Furnishing Status */}
        <div>
          <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-300 mb-1.5 uppercase tracking-wide transition-colors duration-300">
            Furnishing Status
          </label>
          <select
            value={formData?.furnishing || ""}
            onChange={(e) => setFormData(prev => ({ ...prev, furnishing: e.target.value }))}
            className="w-full p-2 text-xs font-bold bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-slate-950 dark:focus:border-rose-500 text-slate-900 dark:text-white transition-colors duration-300"
          >
            <option value="">Select Furnishing</option>
            <option value="Fully Furnished">Fully Furnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
          </select>
        </div>

        {/* Floor Number */}
        <div>
          <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-300 mb-1.5 uppercase tracking-wide transition-colors duration-300">
            Floor Number
          </label>
          <input
            type="text"
            value={formData?.floorNumber || ""}
            onChange={(e) => setFormData(prev => ({ ...prev, floorNumber: e.target.value }))}
            placeholder="e.g., 5"
            className="w-full p-2 text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-slate-950 dark:focus:border-rose-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors duration-300"
          />
        </div>

        {/* Total Floors */}
        <div>
          <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-300 mb-1.5 uppercase tracking-wide transition-colors duration-300">
            Total Floors
          </label>
          <input
            type="text"
            value={formData?.totalFloors || ""}
            onChange={(e) => setFormData(prev => ({ ...prev, totalFloors: e.target.value }))}
            placeholder="e.g., 10"
            className="w-full p-2 text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-slate-950 dark:focus:border-rose-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors duration-300"
          />
        </div>
      </div>
    </div>
  );
}
