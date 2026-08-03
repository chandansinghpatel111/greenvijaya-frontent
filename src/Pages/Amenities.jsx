import React, { useState, useEffect } from "react";

export default function Amenities({ formData, setFormData }) {
  const [selectedAmenities, setSelectedAmenities] = useState(formData?.amenities || []);

  const amenitiesList = [
    "Gym", 
    "Swimming Pool", 
    "Parking", 
    "Security", 
    "Power Backup", 
    "Clubhouse", 
    "Lift",
    "Balcony",
    "Medical Facility",
    "Day Care Center",
    "Pet Area",
    "Indoor Games",
    "Conference Room",
    "Large Green Area",
    "Concierge Desk",
    "Helipad",
    "Golf Course",
    "Multiplex",
    "Serviced Apartments",
    "Service Elevators",
    "High Street Retail",
    "Hypermarket",
    "ATM's",
    "Study Room"
  ];

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, amenities: selectedAmenities }));
  }, [selectedAmenities]);

  return (
    <div className="space-y-3 pt-1 text-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 transition-colors duration-300">
        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-300 transition-colors duration-300">
          Select Available Real Estate Amenities
        </span>
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 transition-colors duration-300">
          {selectedAmenities.length} Selected
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-[300px] sm:max-h-none overflow-y-auto pr-1 custom-scrollbar">
        {amenitiesList.map((amenity) => {
          const isSelected = selectedAmenities.includes(amenity);
          return (
            <button
              key={amenity}
              type="button"
              onClick={() => handleAmenityToggle(amenity)}
              className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs font-bold transition-colors duration-300 border truncate ${
                isSelected
                  ? "bg-slate-950 dark:bg-rose-500 text-white border-slate-950 dark:border-rose-500"
                  : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
              }`}
            >
              <span className="truncate">{amenity}</span>
              <span className={`h-2 w-2 rounded-full shrink-0 ml-1 transition-colors duration-300 ${isSelected ? "bg-white" : "bg-slate-300 dark:bg-slate-500"}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
