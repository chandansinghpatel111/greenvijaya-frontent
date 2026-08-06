import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";
import { CheckCircle2, Home, MapPin } from "lucide-react";

export default function SoldProperties() {
  const [soldProperties, setSoldProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSoldProperties();
  }, []);

  const fetchSoldProperties = async () => {
    try {
      const res = await apiClient.get('/admin/properties');
      const sold = res.data.filter(prop => prop.status === 'Sold');
      setSoldProperties(sold);
    } catch (error) {
      console.error("Error fetching sold properties:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading sold properties...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-brand-burgundy tracking-tight flex items-center gap-2">
          Construction Status <span className="text-gray-400 font-normal">|</span> Sold Properties
        </h2>
        <p className="text-gray-500 mt-1">A real-time overview of properties that have been sold.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {soldProperties.map((property) => (
          <div key={property._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col transition-all hover:shadow-md relative">
            {/* Sold Badge overlay */}
            <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm z-10 flex items-center gap-1">
              <CheckCircle2 size={14} /> Sold
            </div>
            
            {/* Image */}
            <div className="h-48 w-full bg-gray-200 relative">
              {property.images && property.images.length > 0 ? (
                <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover grayscale opacity-80" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Home size={48} />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5 flex-grow flex flex-col">
              <h3 className="text-lg font-bold text-brand-burgundy mb-1 line-clamp-1">{property.projectBuildingName || property.title}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
                <MapPin size={14} /> {property.locality}, {property.city}
              </p>
              
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm mt-auto">
                <p className="text-gray-500 mb-1">Final Price: <strong className="text-brand-burgundy">₹{property.price?.toLocaleString()}</strong></p>
                {property.buyerDetails && (
                  <div className="pt-2 mt-2 border-t border-gray-200">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Buyer Details</p>
                    <p className="text-gray-700"><strong>Name:</strong> {property.buyerDetails.name}</p>
                    <p className="text-gray-700"><strong>Contact:</strong> {property.buyerDetails.phone}</p>
                    <p className="text-gray-700 text-xs text-gray-500 mt-1">Date: {new Date(property.buyerDetails.soldDate).toLocaleDateString()}</p>
                  </div>
                )}
                {!property.buyerDetails && (
                  <p className="text-xs text-gray-400 italic">No buyer details recorded.</p>
                )}
              </div>
            </div>
          </div>
        ))}

        {soldProperties.length === 0 && (
          <div className="col-span-full text-center p-12 bg-white rounded-xl border border-gray-200 text-gray-500">
            No sold properties found.
          </div>
        )}
      </div>
    </div>
  );
}
