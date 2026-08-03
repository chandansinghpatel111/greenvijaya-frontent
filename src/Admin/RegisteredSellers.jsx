import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";
import { User, Mail, Phone, Calendar, CheckCircle } from "lucide-react";

const RegisteredSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const { data } = await apiClient.get("/admin/sellers");
        setSellers(data);
      } catch (err) {
        setErrorMsg("Failed to fetch registered sellers.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSellers();
  }, []);

  const handleApprove = async (id) => {
    try {
      await apiClient.put(`/admin/sellers/${id}/approve`);
      setSellers(sellers.map(s => s._id === id ? { ...s, status: 'active' } : s));
    } catch (err) {
      console.error(err);
      alert("Failed to approve seller.");
    }
  };

  const handleReject = async (id) => {
    try {
      await apiClient.put(`/admin/sellers/${id}/reject`);
      setSellers(sellers.map(s => s._id === id ? { ...s, status: 'rejected' } : s));
    } catch (err) {
      console.error(err);
      alert("Failed to reject seller.");
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-slate-500 dark:text-slate-400 font-semibold transition-colors duration-300">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
        <User className="text-orange-500" size={25} />
        Registered Sellers / Brokers
      </h2>

      {errorMsg && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{errorMsg}</div>}

      {sellers.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm text-center text-gray-500 dark:text-slate-400 border border-gray-100 dark:border-slate-800 transition-colors duration-300">
          No sellers have registered yet.
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800 text-slate-500 dark:text-slate-300 text-[11px] uppercase tracking-wider font-bold border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Contact Info</th>
                  <th className="p-4 font-semibold">Joined Date</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {sellers.map((seller) => (
                  <tr key={seller._id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors duration-200">
                    <td className="p-4">
                      <div className="font-bold text-gray-900 dark:text-white">{seller.name}</div>
                      <div className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-widest mt-1 font-semibold">{seller.role}</div>
                    </td>
                    <td className="p-4 space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300">
                        <Mail size={14} className="text-gray-400 dark:text-slate-500" />
                        {seller.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300">
                        <Phone size={14} className="text-gray-400 dark:text-slate-500" />
                        {seller.mobileNumber || "N/A"}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600 dark:text-slate-300 flex items-center gap-2 h-full py-6">
                      <Calendar size={14} className="text-gray-400 dark:text-slate-500" />
                      {new Date(seller.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      {(!seller.status || seller.status === 'active') && (
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">Active</span>
                      )}
                      {seller.status === 'pending' && (
                        <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded-full">Pending</span>
                      )}
                      {seller.status === 'rejected' && (
                        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">Rejected</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {seller.status === 'pending' && (
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleApprove(seller._id)} className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded hover:bg-green-600 transition-colors">
                            Approve
                          </button>
                          <button onClick={() => handleReject(seller._id)} className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded hover:bg-red-600 transition-colors">
                            Reject
                          </button>
                        </div>
                      )}
                      {(!seller.status || seller.status === 'active') && (
                        <div className="text-green-600 font-bold text-sm flex items-center justify-end gap-1">
                          <CheckCircle size={16} /> Approved
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisteredSellers;
