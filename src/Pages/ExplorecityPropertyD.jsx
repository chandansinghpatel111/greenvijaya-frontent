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
    <div className="w-full space-y-8">

      {/* Listing Type Selection */}
      <div>
        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Listing Type</label>
        <div className="flex flex-wrap gap-3">
          {listingTypes.map((listing) => (
            <button
              key={listing}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                formData.listingType === listing
                  ? "bg-rose-50 border-brand-gold text-brand-gold shadow-sm"
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => handleListingSelect(listing)}
            >
              {listing}
            </button>
          ))}
        </div>
      </div>

      {/* Property Category Selection */}
      <div>
        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Property Category</label>
        <div className="flex flex-wrap gap-3">
          {Object.keys(propertyTypes).map((category) => (
            <button
              key={category}
              className={`flex items-center px-6 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                formData.propertyCategory === category
                  ? "bg-rose-50 border-brand-gold text-brand-gold shadow-sm"
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => handleCategorySelect(category)}
            >
              {category === "Residential" ? <Home size={16} className="mr-2" /> : <Briefcase size={16} className="mr-2" />}
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type Selection */}
      {formData.propertyCategory && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="pt-2">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Property Type</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {propertyTypes[formData.propertyCategory].map((typeObj) => (
              <button
                key={typeObj.name}
                className={`flex items-center p-3 rounded-xl text-sm font-medium transition-all border ${
                  formData.propertyType === typeObj.name
                    ? "bg-rose-50 border-brand-gold text-brand-gold shadow-sm"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => handleTypeSelect(typeObj.name)}
              >
                <div className={`p-2 rounded-lg mr-3 ${formData.propertyType === typeObj.name ? 'bg-white' : 'bg-gray-100'}`}>
                  {typeObj.icon}
                </div>
                <span>{typeObj.name}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <div className="h-px bg-gray-100 w-full my-6"></div>

      {/* Basic Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
          <select
            name="city"
            value={formData.city || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-gold/10 focus:border-brand-gold transition-all bg-gray-50/50"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {["projectBuildingName", "locality", "plotArea", "price"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-bold text-gray-700 mb-2 capitalize">
              {field.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <input
              type={field === 'price' ? 'number' : 'text'}
              name={field}
              placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              value={formData[field] || ""}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-gold/10 focus:border-brand-gold transition-all bg-gray-50/50"
            />
          </div>
        ))}
      </div>

      {/* Description Field */}
      <div className="pt-2">
        <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
        <textarea
          name="description"
          placeholder="Enter a detailed description of the project..."
          value={formData.description || ""}
          onChange={handleChange}
          rows={5}
          className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-gold/10 focus:border-brand-gold transition-all bg-gray-50/50 resize-y"
        ></textarea>
      </div>

    </div>
  );
}
