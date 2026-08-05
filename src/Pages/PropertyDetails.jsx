import { useNavigate } from "react-router-dom";

import { Home, Briefcase, Building2, Landmark, TreePine } from "lucide-react";

import CustomButton from "../components/Button";

export default function PropertyDetails({ formData, setFormData }) {
  const navigate = useNavigate();

  const propertyTypes = {
    Residential: [
      { name: "Flat/Apartment", icon: <Building2 size={20} /> },
      { name: "Independent House/Villa", icon: <Home size={20} /> },
      { name: "Plot/Land", icon: <Landmark size={20} /> },

      { name: "Agricultural Land", icon: <TreePine size={20} /> },
    ],
    Commercial: [
      { name: "Plot/Land", icon: <Landmark size={20} /> },
      { name: "Industry", icon: <Briefcase size={20} /> },
      { name: "Agricultural Land", icon: <TreePine size={20} /> },
    ],
  };

  const listingTypes = ["Sell", "Rent", "Agricultural Land"];


  const handleCategorySelect = (category) => {
    setFormData({ ...formData, propertyCategory: category, propertyType: "" });
  };

  const handleTypeSelect = (type) => {
    setFormData({ ...formData, propertyType: type });
  };

  const handleListingSelect = (listing) => {
    setFormData({ ...formData, listingType: listing });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-center mb-4">Property Details</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Listing Type</label>

        <div className="flex gap-4">
          {listingTypes.map((listing) => (
            <button
              key={listing}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all w-1/3

                ${formData.listingType === listing ? "bg-blue-700 text-white" : "bg-gray-200 hover:bg-gray-300"}`}

              onClick={() => handleListingSelect(listing)}
            >
              {listing}
            </button>
          ))}
        </div>
      </div>


      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Property Category</label>

        <div className="flex gap-4">
          {Object.keys(propertyTypes).map((category) => (
            <button
              key={category}
              className={`flex items-center justify-center px-4 py-2 rounded-md w-1/2 text-sm font-medium transition-all 

                ${formData.propertyCategory === category ? "bg-blue-700 text-white" : "bg-gray-200 hover:bg-gray-300"}`}

              onClick={() => handleCategorySelect(category)}
            >
              {category === "Residential" ? <Home size={18} className="mr-2" /> : <Briefcase size={18} className="mr-2" />}
              {category}
            </button>
          ))}
        </div>
      </div>


      {formData.propertyCategory && (
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Property Type</label>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {propertyTypes[formData.propertyCategory].map((typeObj) => (
              <button
                key={typeObj.name}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all 

                  ${formData.propertyType === typeObj.name ? "bg-blue-700 text-white" : "bg-gray-200 hover:bg-gray-300"}`}

                onClick={() => handleTypeSelect(typeObj.name)}
              >
                {typeObj.icon}
                <span className="ml-2">{typeObj.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}


      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Other Property Details</label>
        <div className="space-y-4">
          {["City", "ProjectBuildingName", "Locality", "PlotArea", "Price"].map((field) => (
            <div key={field} className="w-full">
              <label className="block text-gray-700 font-medium">{field}</label>

              <input
                type="text"
                name={field}
                placeholder={field}
                value={formData[field] || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
