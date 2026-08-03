import { Home, Briefcase, Building2, Landmark, TreePine } from "lucide-react";

export default function PropertyDetails({ formData, setFormData }) {
  const propertyTypes = {
    Residential: [
      { name: "Flat/Apartment", icon: <Building2 size={16} className="shrink-0" /> },
      { name: "Independent House/Villa", icon: <Home size={16} className="shrink-0" /> },
      { name: "Plot/Land", icon: <Landmark size={16} className="shrink-0" /> },
      { name: "Agricultural Land", icon: <TreePine size={16} className="shrink-0" /> },
    ],
    Commercial: [
      { name: "Plot/Land", icon: <Landmark size={16} className="shrink-0" /> },
      { name: "Industry", icon: <Briefcase size={16} className="shrink-0" /> },
      { name: "Agricultural Land", icon: <TreePine size={16} className="shrink-0" /> },
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

  const inputFields = [
    { key: "city", label: "City Location", placeholder: "e.g., Lucknow" },
    { key: "projectBuildingName", label: "Project Building / Society Name", placeholder: "e.g., Green Vijaya Heights" },
    { key: "locality", label: "Locality / Area", placeholder: "e.g., Gomti Nagar Extension" },
    { key: "plotArea", label: "Plot / Super Area (Sq. Ft / Sq. Yards)", placeholder: "e.g., 1800 Sq. Ft" },
    { key: "price", label: "Price Valuation (₹)", placeholder: "e.g., ₹ 85,000,00 or ₹ 35,000 / Mo" },
  ];

  return (
    <div className="space-y-6 text-slate-900 font-sans">
      {/* Listing Type & Category in 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Listing Type */}
        <div className="space-y-2">
          <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            Listing Type
          </label>
          <div className="flex flex-wrap sm:flex-nowrap gap-2">
            {listingTypes.map((listing) => (
              <button
                key={listing}
                type="button"
                onClick={() => handleListingSelect(listing)}
                className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-xs font-extrabold border transition-none ${
                  formData.listingType === listing
                    ? "bg-slate-950 text-white border-slate-950"
                    : "bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                {listing}
              </button>
            ))}
          </div>
        </div>

        {/* Property Category */}
        <div className="space-y-2">
          <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            Property Category
          </label>
          <div className="flex gap-2">
            {Object.keys(propertyTypes).map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategorySelect(category)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-extrabold border transition-none ${
                  formData.propertyCategory === category
                    ? "bg-slate-950 text-white border-slate-950"
                    : "bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                {category === "Residential" ? <Home size={15} className="shrink-0" /> : <Briefcase size={15} className="shrink-0" />}
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Property Type Selection Grid */}
      {formData.propertyCategory && (
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            Property Subtype / Configuration
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {propertyTypes[formData.propertyCategory].map((typeObj) => (
              <button
                key={typeObj.name}
                type="button"
                onClick={() => handleTypeSelect(typeObj.name)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-extrabold border truncate transition-none ${
                  formData.propertyType === typeObj.name
                    ? "bg-slate-950 text-white border-slate-950"
                    : "bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                {typeObj.icon}
                <span className="truncate">{typeObj.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Specific Property Identifiers & Metrics - 2-Column Responsive Grid */}
      <div className="space-y-3 pt-3 border-t border-slate-200/80">
        <h3 className="text-sm font-black text-slate-950 tracking-tight">Property Specifications & Location Data</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {inputFields.map((field, index) => (
            <div key={field.key} className={field.key === "price" ? "sm:col-span-2" : ""}>
              <label className="block text-xs font-extrabold text-slate-800 mb-1.5 uppercase tracking-wide">
                {field.label}
              </label>
              <input
                type="text"
                name={field.key}
                placeholder={field.placeholder}
                value={formData[field.key] || ""}
                onChange={handleChange}
                className="w-full p-3 text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-slate-950 text-slate-900 placeholder:text-slate-400"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
