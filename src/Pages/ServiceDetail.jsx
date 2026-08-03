import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Phone, User, CheckCircle2, Building, Image as ImageIcon } from "lucide-react";
import apiClient from "../api/apiClient";

const serviceConfig = {
  'home': {
    title: 'Buy a Home',
    description: 'Find your dream residential property. Explore top apartments, villas, and houses for sale.',
    filter: (p) => p.propertyType === 'Residential' && p.listingType === 'Sell'
  },
  'commercial': {
    title: 'Buying a Commercial Property',
    description: 'Discover premium commercial spaces, office buildings, and retail shops.',
    filter: (p) => p.propertyType === 'Commercial'
  },
  'rent': {
    title: 'Renting a Home',
    description: 'Find the perfect rental property that fits your lifestyle and budget.',
    filter: (p) => p.listingType === 'Rent'
  }
};

const ServiceDetail = () => {
  const { serviceUrl } = useParams(); 
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const config = serviceConfig[serviceUrl];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get('/properties');
        
        if (config) {
          const filtered = data.filter(config.filter);
          setProperties(filtered);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [serviceUrl, config]);

  if (!config) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-3xl font-bold text-red-600 mb-2">🚫 Service Not Found</h2>
        <p className="text-gray-600 mb-6">The requested service category does not exist.</p>
        <button onClick={() => navigate("/")} className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700">Go Home</button>
      </div>
    );
  }

  const formatPrice = (priceStr) => {
    if (!priceStr) return "Price on Request";
    if (isNaN(priceStr)) return priceStr;
    const price = Number(priceStr);
    if (price >= 10000000) return `₹ ${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹ ${(price / 100000).toFixed(2)} Lac`;
    return `₹ ${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-[#1a0c0f] py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(244,63,94,0.15),_transparent_55%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-rose-300 mb-4">{config.title}</h1>
          <p className="text-rose-100/80 max-w-2xl mx-auto text-lg">{config.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-slate-100">
            <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No Properties Available</h3>
            <p className="text-slate-500">We currently do not have any properties listed under this category. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div key={property._id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 group flex flex-col">
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden bg-slate-200">
                  {property.images && property.images.length > 0 ? (
                    <img 
                      src={property.images[0]} 
                      alt={property.title || property.projectBuildingName} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                      <ImageIcon size={48} className="mb-2 opacity-50" />
                      <span>No Image Available</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#3d1e24] shadow-sm backdrop-blur-md">
                      <CheckCircle2 size={14} className="text-rose-500" />
                      Verified
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 rounded-lg bg-white/95 px-4 py-2 font-black text-slate-900 shadow-lg backdrop-blur-md">
                    {formatPrice(property.price)}
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{property.title || property.projectBuildingName}</h3>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500 mt-1">
                        <MapPin size={16} className="text-rose-500" />
                        <span className="truncate">{property.locality || property.city || 'Location not specified'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                     <span className="inline-block bg-slate-100 text-slate-700 px-2.5 py-1 rounded text-xs font-semibold">{property.propertyType || 'Property'}</span>
                     <span className="inline-block bg-slate-100 text-slate-700 px-2.5 py-1 rounded text-xs font-semibold">{property.listingType || 'Listing'}</span>
                  </div>

                  {/* Broker / Contact Section */}
                  <div className="mt-auto border-t border-slate-100 pt-5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Listed By</h4>
                    {property.broker ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg">
                            {property.broker.name?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{property.broker.name || 'Admin User'}</p>
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Broker / Admin</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                           <div className="flex items-center gap-1.5 text-rose-600 bg-rose-50 px-2.5 py-1.5 rounded-md font-semibold text-sm">
                             <Phone size={14} />
                             {property.broker.mobileNumber || property.contactNumber || 'No Contact Info'}
                           </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold">
                            <User size={20} />
                          </div>
                          <span className="font-semibold text-slate-700 text-sm">Green Vijaya Admin</span>
                        </div>
                        {property.contactNumber && (
                           <div className="flex items-center gap-1.5 text-rose-600 bg-rose-50 px-2.5 py-1.5 rounded-md font-semibold text-sm">
                             <Phone size={14} />
                             {property.contactNumber}
                           </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => navigate('/listing-detail', { state: { project: property } })}
                    className="mt-5 w-full bg-slate-900 hover:bg-[#3d1e24] text-white font-bold py-2.5 rounded-xl transition-colors text-sm"
                  >
                    View Property Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetail;
