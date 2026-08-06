import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";

const Profilepage = () => {
  const { user: userData, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [approvedProperties, setApprovedProperties] = useState([]);
  const [pendingProperties, setPendingProperties] = useState([]);
  const [adminPendingProperties, setAdminPendingProperties] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!userData) {
        setLoading(false);
        return;
      }
      try {
        // User property logic removed as users can no longer post properties

        if (userData.role === "admin") {
          const res = await apiClient.get('/admin/properties/pending');
          setAdminPendingProperties(res.data);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userData]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleApprove = async (id) => {
    try {
      await apiClient.put(`/admin/properties/${id}/approve`);
      setAdminPendingProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error approving property:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await apiClient.put(`/admin/properties/${id}/reject`, { reason: 'Rejected by admin' });
      setAdminPendingProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error rejecting property:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-blue-600 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start min-h-[calc(100vh-4rem)] pt-24 bg-gray-50 px-4 pb-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-[#753441] mb-6">Profile Details</h1>

        {/* Compact User Banner */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8">
          {/* Avatar */}
          <div className="w-20 h-20 bg-gray-100 p-1 rounded-full shadow-inner flex-shrink-0 border border-gray-200">
            {userData?.photoURL ? (
              <img
                src={userData.photoURL}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-[#753441] rounded-full flex justify-center items-center text-white text-3xl font-bold uppercase">
                {userData?.name?.[0] || 'U'}
              </div>
            )}
          </div>
          
          {/* Info */}
          <div className="flex-1 text-center md:text-left flex flex-col justify-center min-h-[5rem]">
            <h2 className="text-xl font-bold text-gray-900 mb-0.5">{userData?.name || 'User Name'}</h2>
            <p className="text-sm text-gray-600">{userData?.email || 'Email not available'}</p>
            <p className="text-sm text-gray-600 mb-2">{userData?.mobileNumber || 'Phone not available'}</p>
            <div>
              <span className="inline-block px-2.5 py-0.5 bg-rose-50 text-[#753441] text-[10px] font-bold uppercase tracking-wider rounded-md border border-rose-100">
                Role: {userData?.role || 'user'}
              </span>
            </div>
          </div>

          {/* Quick Actions (only for user role) */}
          {userData?.role === "user" && (
            <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0 md:self-center">
              <button
                onClick={() => navigate("/")}
                className="px-5 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#b38f2d] hover:from-[#c29624] hover:to-[#9f7d24] text-white rounded-lg font-bold text-sm shadow-sm transition-all active:scale-95"
              >
                Explore Properties
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="px-5 py-2.5 bg-[#753441] hover:bg-[#56252f] text-white rounded-lg font-bold text-sm shadow-sm transition-all active:scale-95"
              >
                Contact Admin
              </button>
            </div>
          )}
        </div>

        {/* Broker Listings removed */}

        {/* Admin */}
        {userData?.role === "admin" && (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-red-700 mb-4">Admin Dashboard</h2>
            {adminPendingProperties.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {adminPendingProperties.map((property) => (
                  <li key={property._id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                    {property.images && property.images.length > 0 && (
                      <img
                        src={property.images[0]}
                        alt="Property"
                        className="w-full h-40 object-cover rounded-lg mb-3"
                      />
                    )}
                    <h3 className="font-semibold text-gray-900 mb-2">{property.title}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>City: {property.location?.city}</p>
                      <p>Price: ₹{property.price}</p>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => handleApprove(property._id)}
                        className="flex-1 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(property._id)}
                        className="flex-1 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No pending properties to approve.</p>
            )}
          </div>
        )}

        {/* Logout (Subtle) */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-500 text-sm font-semibold transition-colors px-2 py-1"
          >
            Log out from device
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
