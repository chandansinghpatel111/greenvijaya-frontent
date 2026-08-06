import { useNavigate } from "react-router-dom";
import { Home, Briefcase, Building2, Landmark } from "lucide-react"; // Importing icons
import CustomButton from "../components/Button";

export default function PropertyDetails({ formData, setFormData }) {
  const navigate = useNavigate();

  const propertyTypes = {
    Residential: [
      { name: "Flat/Apartment", icon: <Building2 size={20} /> },
      { name: "Independent House/Villa", icon: <Home size={20} /> },
      { name: "Plot/Land", icon: <Landmark size={20} /> },
      { name: "1 RK/Studio Apartment", icon: <Building2 size={20} /> },
    ],
    Commercial: [
      { name: "Office", icon: <Briefcase size={20} /> },
      { name: "Retail", icon: <Building2 size={20} /> },
      { name: "Plot/Land", icon: <Landmark size={20} /> },
      { name: "Storage", icon: <Building2 size={20} /> },
      { name: "Industry", icon: <Briefcase size={20} /> },
    ],
  };

  const listingTypes = ["Sell", "Rent", "PG"];

  const cities = ["Lucknow", "Noida", "Gurugram", "Kanpur", "Varanasi"];

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
    <div className=" bg-white rounded-lg shadow-md max-w-6xl mx-auto">


      {/* Listing Type Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Listing Type</label>
        <div className="flex gap-4">
          {listingTypes.map((listing) => (
            <button
              key={listing}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all w-1/3
                ${formData.listingType === listing ? "bg-orange-300 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
              onClick={() => handleListingSelect(listing)}
            >
              {listing}
            </button>
          ))}
        </div>
      </div>

      {/* Property Category Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Property Category</label>
        <div className="flex gap-4">
          {Object.keys(propertyTypes).map((category) => (
            <button
              key={category}
              className={`flex items-center justify-center px-4 py-2 rounded-md w-1/2 text-sm font-medium transition-all 
                ${formData.propertyCategory === category ? "bg-orange-300 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
              onClick={() => handleCategorySelect(category)}
            >
              {category === "Residential" ? <Home size={18} className="mr-2" /> : <Briefcase size={18} className="mr-2" />}
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type Selection */}
      {formData.propertyCategory && (
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Property Type</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {propertyTypes[formData.propertyCategory].map((typeObj) => (
              <button
                key={typeObj.name}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all 
                  ${formData.propertyType === typeObj.name ? "bg-orange-300 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                onClick={() => handleTypeSelect(typeObj.name)}
              >
                {typeObj.icon}
                <span className="ml-2">{typeObj.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* City Dropdown + Other Details */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">City</label>
        <select
          name="city"
          value={formData.city || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Remaining Property Details */}
      <div className="space-y-4">
        {["projectBuildingName", "locality", "plotArea", "price"].map((field) => (
          <div key={field} className="w-full">
            <label className="block text-gray-700 font-medium capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type={field === 'price' ? 'number' : 'text'}
              name={field}
              placeholder={field.replace(/([A-Z])/g, ' $1')}
              value={formData[field] || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}

        {/* Description Field */}
        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Enter project description..."
            value={formData.description || ""}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 resize-y"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
