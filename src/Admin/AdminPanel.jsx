import { useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Building2, ClipboardList, Settings, LogOut, 
  TrendingUp, BarChart3, Menu, X, Home, Users
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const AdminPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    logout();
    navigate("/");
  };

  const navItems = [
    { name: "Dashboard Overview", path: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Project Explore", path: "/admin/ProjectExplore", icon: <Building2 size={20} /> },
    { name: "Property Approvals", path: "/admin/PropertyApproval", icon: <ClipboardList size={20} /> },
    { name: "Post Property", path: "/admin/PostPropertyForm", icon: <Home size={20} /> },
    { name: "Post Project", path: "/admin/PostProjectForm", icon: <TrendingUp size={20} /> },
    { name: "Construction Status", path: "/admin/Buys", icon: <BarChart3 size={20} /> },
    { name: "Admin Signup", path: "/admin/AdminSignup", icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-[#f3f4f6] font-sans overflow-hidden">
      
      {/* Sidebar - Dark Real Estate Theme */}
      <div 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#1a0c0f] text-white shadow-2xl flex flex-col h-full border-r border-brand-burgundy transition-all duration-300 flex-shrink-0 z-20`}
      >
        <div className="p-6 pb-2 border-b border-white/10 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h1 
                className="text-2xl font-black cursor-pointer tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-[#d4af37] whitespace-nowrap"
                onClick={() => navigate("/admin")}
              >
                ADMIN
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1 mb-4 whitespace-nowrap">Green Vijaya Infra</p>
            </div>
          )}
          {!sidebarOpen && (
            <div className="mx-auto mb-4 cursor-pointer" onClick={() => navigate("/admin")}>
              <h1 className="text-2xl font-black text-[#d4af37]">A</h1>
            </div>
          )}
        </div>

        <ul className="space-y-2 p-4 flex-grow overflow-y-auto overflow-x-hidden">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <li key={index}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center ${sidebarOpen ? 'justify-start gap-3 px-4' : 'justify-center px-0'} py-3 rounded-xl transition-all font-medium text-sm
                    ${isActive 
                      ? "bg-brand-gold text-white shadow-lg" 
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  title={!sidebarOpen ? item.name : ""}
                >
                  <div className="flex-shrink-0">{item.icon}</div>
                  {sidebarOpen && <span className="whitespace-nowrap">{item.name}</span>}
                </button>
              </li>
            );
          })}
        </ul>
        
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center ${sidebarOpen ? 'justify-center gap-2' : 'justify-center'} bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-gray-400 py-3 rounded-xl font-bold transition-all border border-transparent hover:border-red-500/30 text-sm`}
            title={!sidebarOpen ? "Logout" : ""}
          >
            <div className="flex-shrink-0"><LogOut size={18} /></div>
            {sidebarOpen && <span className="whitespace-nowrap">Logout Session</span>}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0 bg-gray-50 h-screen overflow-hidden">
        
        {/* Top Navbar */}
        <div className="bg-white px-8 py-5 flex justify-between items-center shadow-sm border-b border-gray-200 z-10 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div>
              <h1 className="text-xl font-black text-brand-burgundy tracking-tight">
                Admin <span className="text-brand-gold">Portal</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 px-4 py-2 rounded-full text-xs font-bold text-gray-700 flex items-center gap-2 border border-gray-200">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="hidden sm:inline">System Online</span>
            </div>
            <div className="w-10 h-10 bg-gradient-to-tr from-brand-gold to-[#1a0c0f] rounded-full border-2 border-white shadow-md flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </div>

        {/* Scrollable Page Content (Outlet) */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-8">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default AdminPanel;
