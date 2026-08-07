import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";
import { Check, X, Trash2, Home, MapPin, Edit, Tag, Search } from "lucide-react";

export default function PropertyApproval() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProperty, setEditingProperty] = useState(null);
  const [editForm, setEditForm] = useState({ 
    title: '', 
    price: '',
    plotArea: '',
    listingType: '',
    propertyCategory: '',
    propertyType: '',
    facingType: ''
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await apiClient.get('/admin/properties');
      // Sort so pending properties show up at the top
      const sorted = res.data.sort((a, b) => {
        if (a.status === 'Pending' && b.status !== 'Pending') return -1;
        if (b.status === 'Pending' && a.status !== 'Pending') return 1;
        return 0;
      });
      setProperties(sorted);
    } catch (error) {
      console.error("Error fetching properties: ", error);
    } finally {
      setLoading(false);
    }
  };

  const approveProperty = async (id) => {
    try {
      await apiClient.put(`/admin/properties/${id}/approve`);
      setProperties((prev) =>
        prev.map((prop) => (prop._id === id ? { ...prop, status: 'Approved', isApproved: true } : prop))
      );
    } catch (error) {
      console.error("Error approving property: ", error);
    }
  };

  const rejectProperty = async (id) => {
    const reason = prompt("Enter rejection reason (optional):");
    if (reason === null) return; // User cancelled

    try {
      await apiClient.put(`/admin/properties/${id}/reject`, { reason });
      setProperties((prev) =>
        prev.map((prop) => (prop._id === id ? { ...prop, status: 'Rejected', isApproved: false } : prop))
      );
    } catch (error) {
      console.error("Error rejecting property: ", error);
    }
  };

  const deleteProperty = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property? This cannot be undone.")) return;

    try {
      await apiClient.delete(`/admin/properties/${id}`);
      setProperties((prev) => prev.filter((prop) => prop._id !== id));
    } catch (error) {
      console.error("Error deleting property: ", error);
    }
  };

  const markAsSold = async (id) => {
    const buyerName = prompt("Enter buyer name (optional):", "Walk-in");
    if (buyerName === null) return;
    const buyerPhone = prompt("Enter buyer phone (optional):", "");

    try {
      await apiClient.put(`/admin/properties/${id}/sold`, {
        buyerDetails: { name: buyerName, phone: buyerPhone }
      });
      setProperties((prev) =>
        prev.map((prop) => (prop._id === id ? { ...prop, status: 'Sold' } : prop))
      );
      alert("Property marked as sold!");
    } catch (error) {
      console.error("Error marking as sold: ", error);
    }
  };

  const handleEditClick = (property) => {
    setEditingProperty(property);
    setEditForm({
      title: property.projectBuildingName || property.title || '',
      price: property.price || '',
      plotArea: property.plotArea || '',
      listingType: property.listingType || '',
      propertyCategory: property.propertyCategory || '',
      propertyType: property.propertyType || '',
      facingType: property.facingType || ''
    });
  };

  const saveEdit = async () => {
    try {
      await apiClient.put(`/properties/${editingProperty._id}`, {
        projectBuildingName: editForm.title,
        title: editForm.title,
        price: editForm.price,
        plotArea: editForm.plotArea,
        listingType: editForm.listingType,
        propertyCategory: editForm.propertyCategory,
        propertyType: editForm.propertyType,
        facingType: editForm.facingType
      });
      setProperties((prev) =>
        prev.map((prop) =>
          prop._id === editingProperty._id
            ? { 
                ...prop, 
                projectBuildingName: editForm.title, 
                title: editForm.title, 
                price: editForm.price,
                plotArea: editForm.plotArea,
                listingType: editForm.listingType,
                propertyCategory: editForm.propertyCategory,
                propertyType: editForm.propertyType,
                facingType: editForm.facingType
              }
            : prop
        )
      );
      setEditingProperty(null);
    } catch (error) {
      console.error("Error updating property: ", error);
      alert("Error updating property.");
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading properties...</div>;

  return (
    <div className="p-4 sm:p-4 max-w-full mx-auto bg-gray-50 min-h-screen">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-brand-burgundy tracking-tight">Property Approvals</h2>
          <p className="text-gray-500 mt-1">Review, approve, or reject properties submitted by owners.</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by title, city, or owner..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all text-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-bold">
                <th className="px-6 py-4">Property</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {properties
                .filter(property => {
                  if (!searchQuery) return true;
                  const query = searchQuery.toLowerCase();
                  const title = (property.title || property.projectBuildingName || '').toLowerCase();
                  const city = (property.city || property.locality || '').toLowerCase();
                  const ownerName = (property.postedBy?.name || '').toLowerCase();
                  return title.includes(query) || city.includes(query) || ownerName.includes(query);
                })
                .map((property) => (
                  <tr key={property._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-brand-burgundy line-clamp-1">{property.title || property.projectBuildingName || 'Unnamed Property'}</div>
                      <div className="text-xs text-gray-500 mt-1">{property.propertyType}</div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700 flex items-center gap-1">
                        <MapPin size={14} className="text-gray-400" />
                        <span className="line-clamp-1">{property.locality}, {property.city}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-brand-burgundy">₹ {property.price?.toLocaleString()}</div>
                      <div className="text-xs text-gray-500 mt-1">Area: {property.plotArea}</div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-brand-burgundy/90">{property.postedBy?.name || 'Unknown Owner'}</div>
                      <div className="text-xs text-gray-500">{property.postedBy?.email}</div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                      ${property.status === 'Approved' ? 'bg-green-100 text-green-700 border border-green-200' :
                          property.status === 'Rejected' ? 'bg-red-100 text-red-700 border border-red-200' : 
                          property.status?.toLowerCase() === 'sold' ? 'bg-gray-200 text-gray-800 border border-gray-300' : 
                          'bg-yellow-100 text-yellow-700 border border-yellow-200'}`}
                      >
                        {property.status || 'Pending'}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2 min-w-[120px]">
                        {property.status !== 'Approved' && property.status?.toLowerCase() !== 'sold' && (
                          <button
                            onClick={() => approveProperty(property._id)}
                            className="flex items-center justify-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-green-600 transition"
                          >
                            <Check size={14} /> Approve
                          </button>
                        )}

                        {property.status !== 'Rejected' && property.status !== 'Approved' && property.status?.toLowerCase() !== 'sold' && (
                          <button
                            onClick={() => rejectProperty(property._id)}
                            className="flex items-center justify-center gap-2 bg-yellow-500 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-yellow-600 transition"
                          >
                            <X size={14} /> Reject
                          </button>
                        )}

                        <button
                          onClick={() => deleteProperty(property._id)}
                          className="flex items-center justify-center gap-2 bg-white text-red-600 border border-red-200 px-3 py-1.5 rounded text-xs font-bold hover:bg-red-50 hover:text-red-700 transition"
                        >
                          <Trash2 size={14} /> Delete
                        </button>

                        <button
                          onClick={() => handleEditClick(property)}
                          className="flex items-center justify-center gap-2 bg-white text-blue-600 border border-blue-200 px-3 py-1.5 rounded text-xs font-bold hover:bg-blue-50 hover:text-blue-700 transition"
                        >
                          <Edit size={14} /> Edit
                        </button>

                        {property.status !== 'Sold' && property.status === 'Approved' && (
                          <button
                            onClick={() => markAsSold(property._id)}
                            className="flex items-center justify-center gap-2 bg-gray-900 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-gray-800 transition"
                          >
                            <Tag size={14} /> Mark Sold
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

              {properties.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-12 text-gray-500">
                    No properties found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingProperty && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg text-brand-burgundy">Quick Edit Property</h3>
              <button onClick={() => setEditingProperty(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Title / Building Name</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                  className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Plot Area</label>
                <input
                  type="text"
                  value={editForm.plotArea}
                  onChange={(e) => setEditForm({ ...editForm, plotArea: e.target.value })}
                  className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all"
                  placeholder="e.g. 5 Acres, 3000 sqft"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Listing Type</label>
                  <select 
                    value={editForm.listingType} 
                    onChange={(e) => setEditForm({...editForm, listingType: e.target.value})}
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all"
                  >
                    <option value="">Select</option>
                    <option value="Sell">Sell</option>
                    <option value="Rent">Rent</option>
                    <option value="PG">PG</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Facing Type</label>
                  <select 
                    value={editForm.facingType} 
                    onChange={(e) => setEditForm({...editForm, facingType: e.target.value})}
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all"
                  >
                    <option value="">Select</option>
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
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                  <select 
                    value={editForm.propertyCategory} 
                    onChange={(e) => setEditForm({...editForm, propertyCategory: e.target.value, propertyType: ''})}
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all"
                  >
                    <option value="">Select</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Property Type</label>
                  <select 
                    value={editForm.propertyType} 
                    onChange={(e) => setEditForm({...editForm, propertyType: e.target.value})}
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all"
                  >
                    <option value="">Select</option>
                    {editForm.propertyCategory === 'Residential' && (
                      <>
                        <option value="Flat/Apartment">Flat/Apartment</option>
                        <option value="Independent House/Villa">Independent House/Villa</option>
                        <option value="Plot/Land">Plot/Land</option>
                        <option value="1 RK/Studio Apartment">1 RK/Studio Apartment</option>
                      </>
                    )}
                    {editForm.propertyCategory === 'Commercial' && (
                      <>
                        <option value="Office">Office</option>
                        <option value="Retail">Retail</option>
                        <option value="Plot/Land">Plot/Land</option>
                        <option value="Storage">Storage</option>
                        <option value="Industry">Industry</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setEditingProperty(null)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-[#d4af37] text-white rounded-lg text-sm font-bold hover:bg-[#b5952f]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
