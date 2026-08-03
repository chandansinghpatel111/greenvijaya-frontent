import { Home, Briefcase, Building2, Landmark } from "lucide-react";

export default function PropertyDetails({ formData, setFormData, cities = [] }) {
  const propertyTypes = {
    Residential: [
      { name: "Flat/Apartment", icon: <Building2 size={15} /> },
      { name: "Independent House/Villa", icon: <Home size={15} /> },
      { name: "Plot/Land", icon: <Landmark size={15} /> },
      { name: "1 RK/Studio Apartment", icon: <Building2 size={15} /> },
    ],
    Commercial: [
      { name: "Office", icon: <Briefcase size={15} /> },
      { name: "Retail", icon: <Building2 size={15} /> },
      { name: "Plot/Land", icon: <Landmark size={15} /> },
      { name: "Storage", icon: <Building2 size={15} /> },
      { name: "Industry", icon: <Briefcase size={15} /> },
    ],
  };

  const listingTypes = ["Sell", "Rent", "PG"];

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
    <div className="space-y-3.5 text-slate-900">
      {/* Listing Type & Category in 2 Columns on larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* Listing Type */}
        <div>
          <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-300 mb-1.5 uppercase tracking-wide transition-colors duration-300">Listing Type</label>
          <div className="flex gap-1.5">
            {listingTypes.map((listing) => (
              <button
                key={listing}
                type="button"
                onClick={() => handleListingSelect(listing)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-extrabold transition-colors duration-300 border ${
                  formData.listingType === listing 
                    ? "bg-slate-950 dark:bg-rose-500 text-white border-slate-950 dark:border-rose-500" 
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {listing}
              </button>
            ))}
          </div>
        </div>

        {/* Property Category */}
        <div>
          <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-300 mb-1.5 uppercase tracking-wide transition-colors duration-300">Property Category</label>
          <div className="flex gap-1.5">
            {Object.keys(propertyTypes).map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategorySelect(category)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-extrabold transition-colors duration-300 border ${
                  formData.propertyCategory === category 
                    ? "bg-slate-950 dark:bg-rose-500 text-white border-slate-950 dark:border-rose-500" 
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {category === "Residential" ? <Home size={14} className="shrink-0" /> : <Briefcase size={14} className="shrink-0" />}
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Property Type Selection - Compact Grid */}
      {formData.propertyCategory && (
        <div>
          <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-300 mb-1.5 uppercase tracking-wide transition-colors duration-300">Property Type</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {propertyTypes[formData.propertyCategory].map((typeObj) => (
              <button
                key={typeObj.name}
                type="button"
                onClick={() => handleTypeSelect(typeObj.name)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors duration-300 border truncate ${
                  formData.propertyType === typeObj.name 
                    ? "bg-slate-950 dark:bg-rose-500 text-white border-slate-950 dark:border-rose-500" 
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <span className="shrink-0">{typeObj.icon}</span>
                <span className="truncate">{typeObj.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* City Dropdown & Details - 2 Column Compact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div>
          <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-300 mb-1 uppercase tracking-wide transition-colors duration-300">City</label>
          <select
            name="city"
            value={formData.city || ""}
            onChange={handleChange}
            className="w-full p-2 text-xs font-bold bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-slate-950 dark:focus:border-rose-500 text-slate-900 dark:text-white transition-colors duration-300"
          >
            <option value="">Select City Location</option>
            {[
              "Agra", "Ahmedabad", "Ajmer", "Aligarh", "Allahabad", "Amravati", "Amritsar", "Asansol", "Aurangabad", 
              "Bareilly", "Belgaum", "Bengaluru", "Bhavnagar", "Bhilai", "Bhiwandi", "Bhopal", "Bhubaneswar", "Bikaner", 
              "Chandigarh", "Chennai", "Coimbatore", "Cuttack", "Dehradun", "Delhi", "Dhanbad", "Durgapur", "Erode", 
              "Faridabad", "Firozabad", "Gaya", "Ghaziabad", "Gorakhpur", "Gulbarga", "Guntur", "Gurugram", "Guwahati", 
              "Gwalior", "Howrah", "Hubli-Dharwad", "Hyderabad", "Indore", "Jabalpur", "Jaipur", "Jalandhar", "Jalgaon", 
              "Jammu", "Jamnagar", "Jamshedpur", "Jhansi", "Jodhpur", "Kalyan-Dombivli", "Kanpur", "Kochi", "Kolhapur", 
              "Kolkata", "Kota", "Loni", "Lucknow", "Ludhiana", "Madurai", "Maheshtala", "Malegaon", "Mangalore", "Meerut", 
              "Mira-Bhayandar", "Moradabad", "Mumbai", "Mysuru", "Nagpur", "Nanded", "Nashik", "Navi Mumbai", "Nellore", 
              "Noida", "Patna", "Pimpri-Chinchwad", "Pune", "Raipur", "Rajkot", "Ranchi", "Rourkela", "Saharanpur", 
              "Salem", "Sangli", "Siliguri", "Solapur", "Srinagar", "Surat", "Thane", "Thiruvananthapuram", 
              "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Udaipur", "Ujjain", "Ulhasnagar", "Vadodara", "Varanasi", 
              "Vasai-Virar", "Vijayawada", "Visakhapatnam", "Warangal", "Other"
            ].map((city, i) => (
              <option key={i} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-300 mb-1 uppercase tracking-wide transition-colors duration-300">Project Building Name</label>
          <input
            type="text"
            name="projectBuildingName"
            placeholder="e.g., Green Vijaya Towers"
            value={formData.projectBuildingName || ""}
            onChange={handleChange}
            className="w-full p-2 text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-slate-950 dark:focus:border-rose-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors duration-300"
          />
        </div>

        <div>
          <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-300 mb-1 uppercase tracking-wide transition-colors duration-300">Locality</label>
          <input
            type="text"
            name="locality"
            placeholder="e.g., Gomti Nagar"
            value={formData.locality || ""}
            onChange={handleChange}
            className="w-full p-2 text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-slate-950 dark:focus:border-rose-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors duration-300"
          />
        </div>

        <div>
          <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-300 mb-1 uppercase tracking-wide transition-colors duration-300">Plot Area (Sq. Ft / Sq. Yards)</label>
          <input
            type="text"
            name="plotArea"
            placeholder="e.g., 2500 Sq. Ft"
            value={formData.plotArea || ""}
            onChange={handleChange}
            className="w-full p-2 text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-slate-950 dark:focus:border-rose-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors duration-300"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-300 mb-1 uppercase tracking-wide transition-colors duration-300">Price Valuation</label>
          <input
            type="text"
            name="price"
            placeholder="e.g., ₹ 1.25 Cr or ₹ 45,000 / Mo"
            value={formData.price || ""}
            onChange={handleChange}
            className="w-full p-2 text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-slate-950 dark:focus:border-rose-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors duration-300"
          />
        </div>
      </div>
    </div>
  );
}
