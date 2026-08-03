import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";

const Profilepage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [approvedProperties, setApprovedProperties] = useState([]);
  const [pendingProperties, setPendingProperties] = useState([]);
  const [rejectedProperties, setRejectedProperties] = useState([]);
  const [adminPendingProperties, setAdminPendingProperties] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
          if (user.role === "admin" || user.role === "Admin") {
            navigate("/admin/profile");
            return;
          }
          setUserData(user);

          // For Broker
          if (user.role === "broker") {
            const { data } = await apiClient.get('/properties/my-properties');
            setApprovedProperties(data.filter((p) => p.status === 'Approved'));
            setPendingProperties(data.filter((p) => p.status === 'Pending'));
            setRejectedProperties(data.filter((p) => p.status === 'Rejected'));
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate("/login");
  };

  const handleApprove = async (id) => {
    try {
      await apiClient.put(`/admin/properties/${id}/approve`);
      setAdminPendingProperties((prev) => prev.filter((p) => p._id !== id));
    } catch(err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await apiClient.put(`/admin/properties/${id}/reject`);
      setAdminPendingProperties((prev) => prev.filter((p) => p._id !== id));
    } catch(err) {
      console.error(err);
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
    <div className="flex justify-center items-center min-h-screen bg-slate-50 px-4 py-8">
      <div className="w-full max-w-3xl p-5 sm:p-8 bg-white rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-black text-slate-800 mb-6 border-b pb-3 text-center">My Profile</h1>

        {/* User Info */}
        <div className="mb-8 flex flex-col sm:flex-row items-center gap-6 bg-slate-50 p-5 rounded-xl border border-slate-100">
          <div className="w-24 h-24 bg-white p-1 rounded-full shadow-sm border border-slate-200 shrink-0 flex justify-center items-center">
            {userData?.photoURL ? (
              <img src={userData.photoURL} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              <div className="w-full h-full bg-[#ec9322] rounded-full flex justify-center items-center text-white text-2xl font-bold">
                {userData?.name?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-slate-800">{userData?.name}</h2>
            <p className="text-sm text-slate-600 mb-1">{userData?.email}</p>
            <p className="text-sm text-slate-600 mb-2">{userData?.mobileNumber}</p>
            <span className="inline-block px-3 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded-full uppercase tracking-wider">
              {userData?.role}
            </span>
          </div>
        </div>

        {/* Broker Dashboard */}
        {userData?.role === "broker" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center bg-orange-50 p-4 rounded-lg border border-orange-100 gap-4">
              <div className="text-center sm:text-left">
                <h2 className="text-lg font-bold text-slate-800">Property Dashboard</h2>
                <p className="text-xs text-slate-600">Manage your listings</p>
              </div>
              <button onClick={() => navigate("/Postlisting")} className="bg-[#ec9322] hover:bg-[#d8841e] text-white px-5 py-2 rounded-md text-sm font-bold shadow-sm transition-colors w-full sm:w-auto">
                + Post Property
              </button>
            </div>

            <div>
              <h2 className="text-sm font-bold text-green-700 mb-3 uppercase tracking-wide">Approved Listings</h2>
              {approvedProperties.length > 0 ? (
                <div className="grid gap-3">
                  {approvedProperties.map((property) => (
                    <div key={property._id} className="p-3 bg-white rounded-lg shadow-sm border border-slate-200 flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm">{property.title}</h3>
                        <p className="text-slate-500 text-xs">{property.locality}, {property.city} • ₹{property.price}</p>
                      </div>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-[10px] font-bold uppercase">Approved</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-sm italic bg-slate-50 p-3 rounded-lg border border-slate-100">No approved properties yet.</p>
              )}
            </div>

            <div>
              <h2 className="text-sm font-bold text-yellow-600 mb-3 uppercase tracking-wide">Pending Approvals</h2>
              {pendingProperties.length > 0 ? (
                <div className="grid gap-3">
                  {pendingProperties.map((property) => (
                    <div key={property._id} className="p-3 bg-white rounded-lg shadow-sm border border-slate-200 flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm">{property.title}</h3>
                        <p className="text-slate-500 text-xs">{property.locality}, {property.city} • ₹{property.price}</p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-[10px] font-bold uppercase">Pending</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-sm italic bg-slate-50 p-3 rounded-lg border border-slate-100">No pending properties.</p>
              )}
            </div>

            <div>
              <h2 className="text-sm font-bold text-red-600 mb-3 uppercase tracking-wide">Rejected Listings</h2>
              {rejectedProperties.length > 0 ? (
                <div className="grid gap-3">
                  {rejectedProperties.map((property) => (
                    <div key={property._id} className="p-3 bg-white rounded-lg shadow-sm border border-red-100">
                      <div className="flex justify-between items-center mb-1">
                        <div>
                          <h3 className="font-bold text-slate-800 text-sm">{property.title}</h3>
                          <p className="text-slate-500 text-xs">{property.locality}, {property.city} • ₹{property.price}</p>
                        </div>
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-[10px] font-bold uppercase">Rejected</span>
                      </div>
                      {property.rejectionReason && (
                        <div className="bg-red-50 p-2 rounded mt-2 text-xs text-red-700 border border-red-100">
                          <span className="font-bold">Reason:</span> {property.rejectionReason}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-sm italic bg-slate-50 p-3 rounded-lg border border-slate-100">No rejected properties.</p>
              )}
            </div>
          </div>
        )}

        {/* Admin section removed - now handled in the dedicated Admin Panel */}

        {/* Logout */}
        <div className="flex justify-center mt-8 pt-6 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="px-8 py-2 bg-slate-100 hover:bg-red-50 text-red-600 font-bold rounded-full transition-colors text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
