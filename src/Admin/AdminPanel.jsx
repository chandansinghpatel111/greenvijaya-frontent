import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    navigate("/");
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-orange-600 text-white p-6 shadow-xl flex flex-col h-full">
          <h1 className="text-2xl font-black mb-10 cursor-pointer tracking-tighter border-b border-orange-500 pb-4" onClick={() => navigate("/admin")}>
            ADMIN PORTAL
          </h1>
          <ul className="space-y-4 flex-grow">
            <li className="cursor-pointer hover:bg-orange-700 p-3 rounded-lg transition-colors font-medium flex items-center" onClick={() => navigate("/admin/ProjectExplore")}>
              ✨ Project Explore
            </li>
            <li className="cursor-pointer hover:bg-orange-700 p-3 rounded-lg transition-colors font-medium flex items-center" onClick={() => navigate("/admin/Postproject")}>
              📝 Post Property
            </li>
            <li className="cursor-pointer hover:bg-orange-700 p-3 rounded-lg transition-colors font-medium flex items-center" onClick={() => window.location.href = "/PostProperty"}>
              🏗️ Post Project
            </li>
            <li className="cursor-pointer hover:bg-orange-700 p-3 rounded-lg transition-colors font-medium flex items-center" onClick={() => navigate("/admin/Buys")}>
              📊 Construction Status
            </li>
            <li className="cursor-pointer hover:bg-orange-700 p-3 rounded-lg transition-colors font-medium flex items-center" onClick={() => navigate("/admin/ComingSoon")}>
              👤 Admin Signup
            </li>
          </ul>
          
          <button 
            onClick={handleLogout}
            className="mt-auto bg-red-700 hover:bg-red-800 text-white py-3 rounded-lg font-bold transition-all shadow-lg"
          >
            Logout session
          </button>
        </div>

        {/* Main Dashboard */}
        <div className="flex-grow overflow-y-auto p-8 bg-gray-50">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-black text-gray-800 tracking-tighter">DASHBOARD <span className="text-orange-500">OVERVIEW</span></h1>
            <div className="bg-white px-6 py-2 rounded-full shadow-sm text-sm font-bold text-gray-600 border border-gray-200">
              Welcome, Administrator
            </div>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Properties</p>
              <h2 className="text-2xl font-black text-gray-800">Total Projects</h2>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Services</p>
              <h2 className="text-2xl font-black text-gray-800">Our Services</h2>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Users</p>
              <h2 className="text-2xl font-black text-gray-800">Total Postings</h2>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Inquiries</p>
              <h2 className="text-2xl font-black text-gray-800">Total Contacts</h2>
            </div>
          </div>

          {/* Charts Placeholder */}
          <div className="grid grid-cols-1 gap-8 mt-10 md:grid-cols-2 lg:grid-cols-2">
            <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 h-64 flex flex-col items-center justify-center text-gray-300">
              <div className="w-16 h-16 bg-gray-50 rounded-full mb-4 flex items-center justify-center">📊</div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Data Overview</h3>
            </div>
            <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 h-64 flex flex-col items-center justify-center text-gray-300">
              <div className="w-16 h-16 bg-gray-50 rounded-full mb-4 flex items-center justify-center">🥧</div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Data Breakdown</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
