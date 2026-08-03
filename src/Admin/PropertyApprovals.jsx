import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";
import { X } from "lucide-react";

const PropertyApprovals = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState("Pending");

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.get("/admin/properties");
      setProperties(data);
    } catch (err) {
      setErrorMsg("Failed to fetch properties.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleApprove = async (id) => {
    if (!window.confirm("Are you sure you want to approve this property?")) return;
    try {
      await apiClient.put(`/admin/properties/${id}/approve`);
      setProperties(properties.map((prop) =>
        prop._id === id ? { ...prop, status: 'Approved', rejectionReason: '' } : prop
      ));
      alert("Property approved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to approve property.");
    }
  };

  const handleMarkAsSold = async (id) => {
    const buyerName = window.prompt("Enter the Buyer's Name:");
    if (!buyerName) return; // Cancelled or empty

    try {
      const { data } = await apiClient.put(`/admin/properties/${id}/sold`, { buyerDetails: { name: buyerName } });
      setProperties(properties.map((prop) =>
        prop._id === id ? { ...prop, status: 'Sold', buyerDetails: data.buyerDetails } : prop
      ));
      alert("Property marked as Sold successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to mark property as sold.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to completely delete this property? This cannot be undone.")) return;

    try {
      await apiClient.delete(`/admin/properties/${id}`);
      setProperties(properties.filter((prop) => prop._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete property.");
    }
  };

  const filteredProperties = activeTab === "All" ? properties : properties.filter(prop => prop.status === activeTab);

  if (loading) {
    return (
      <div className="p-10 text-center text-slate-500 dark:text-slate-400 font-semibold transition-colors duration-300">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Property Management</h2>

        {/* Tabs */}
        <div className="flex bg-white dark:bg-slate-900 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none p-1.5 border border-slate-100 dark:border-slate-800">
          {["All", "Pending", "Approved", "Rejected", "Sold"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 rounded-md text-xs font-semibold transition-colors ${activeTab === tab
                ? "bg-[#ec9322] text-white shadow-sm"
                : "text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {errorMsg && <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 border border-red-100">{errorMsg}</div>}

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
        {filteredProperties.length === 0 ? (
          <div className="p-10 text-center text-gray-500 font-semibold">
            No {activeTab.toLowerCase()} properties at the moment.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-300 text-[11px] uppercase tracking-wider font-bold transition-colors duration-300">
                  <th className="p-4 font-bold">Property Details</th>
                  <th className="p-4 font-bold">Location</th>
                  <th className="p-4 font-bold">Price</th>
                  <th className="p-4 font-bold">Seller / Broker</th>
                  <th className="p-4 font-bold text-center">Status</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {filteredProperties.map((property) => (
                  <tr key={property._id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors duration-200">
                    <td className="p-4">
                      <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">{property.title}</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">{property.propertyType || "N/A"}</p>
                    </td>
                    <td className="p-4 text-sm text-gray-700 dark:text-slate-300">
                      {property.city || "N/A"}, {property.state || "N/A"}
                    </td>
                    <td className="p-4 text-sm font-bold text-gray-900 dark:text-white">
                      ₹{property.price?.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-semibold text-gray-800 dark:text-slate-200">{property.broker?.name || "Unknown"}</p>
                        {property.broker?.role && (
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${property.broker.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                            {property.broker.role}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-slate-400">{property.broker?.mobileNumber || "N/A"}</p>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase ${property.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        property.status === 'Sold' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                        {property.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2 flex-wrap min-w-[120px]">
                        {property.status === 'Pending' && (
                          <button
                            onClick={() => handleApprove(property._id)}
                            className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded shadow-sm transition-colors"
                          >
                            Approve
                          </button>
                        )}
                        {property.status === 'Approved' && (
                          <button
                            onClick={() => handleMarkAsSold(property._id)}
                            className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded shadow-sm transition-colors"
                          >
                            Mark as Sold
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(property._id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded shadow-sm transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                      {property.status === 'Sold' && property.buyerDetails && (
                        <div className="mt-1 text-center inline-block text-xs text-gray-600 dark:text-slate-400 bg-gray-100 dark:bg-slate-800 p-1 rounded">
                          <span className="font-bold block text-gray-800 dark:text-slate-300">Buyer: {property.buyerDetails.name}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyApprovals;
