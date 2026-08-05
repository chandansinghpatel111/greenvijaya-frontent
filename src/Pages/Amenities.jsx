import React, { useState, useEffect } from "react";

export default function Amenities({ formData, setFormData, nextStep, prevStep }) {
  const [selectedAmenities, setSelectedAmenities] = useState(formData.amenities || []);

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
    "ATM'S",
    "Study Room",
    

  ];

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  useEffect(() => {
    // Keep syncing with main formData when selection changes
    setFormData({ ...formData, amenities: selectedAmenities });
  }, [selectedAmenities]);

  return (

    <div className="p-6 bg-white  opacity-50 rounded-lg shadow-md w-full max-w-2xl mx-auto">

      <h2 className="text-xl font-bold mb-4 text-center">Select Amenities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {amenitiesList.map((amenity) => (
          <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedAmenities.includes(amenity)}
              onChange={() => handleAmenityChange(amenity)}
              className="form-checkbox text-[#ec9322]"
            />
            <span>{amenity}</span>
          </label>
        ))}
      </div>

      {/* Navigation Buttons */}
      
    </div>
  );
}


