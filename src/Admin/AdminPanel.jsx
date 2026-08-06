import { useState, useEffect, useRef } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Building2, ClipboardList, Settings, LogOut,
  TrendingUp, BarChart3, Menu, X, Home, Users, Bell, CheckCircle2
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import apiClient from "../api/apiClient";

const AdminPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Notification state
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchNotifications();
    // Close dropdown on outside click
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await apiClient.get("/notifications");
      setNotifications(res.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await apiClient.put(`/notifications/${id}/read`);
      setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await apiClient.put("/notifications/read-all");
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
        <div className="bg-white px-8 py-5 flex justify-between items-center shadow-sm border-b border-gray-200 z-50 relative flex-shrink-0">
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

            {/* Notification Bell */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 transform bg-red-500 text-white text-[8px] font-bold px-1 ">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h3 className="font-bold text-gray-800">Notifications</h3>
                    {unreadCount > 0 && (
                      <button onClick={markAllAsRead} className="text-xs font-semibold text-brand-gold hover:text-[#d4af37]">
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-gray-500 text-sm">
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.map(notif => (
                        <div
                          key={notif._id}
                          onClick={() => !notif.isRead && markAsRead(notif._id)}
                          className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${!notif.isRead ? 'bg-blue-50/30' : ''}`}
                        >
                          <div className="flex gap-3">
                            <div className="mt-1">
                              {notif.type === 'registration' ? (
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                  <Users size={16} />
                                </div>
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                  <Bell size={16} />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className={`text-sm ${!notif.isRead ? 'font-bold text-gray-900' : 'text-gray-700'}`}>
                                {notif.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                                {notif.message}
                              </p>
                              <p className="text-[10px] text-gray-400 mt-2 font-medium">
                                {new Date(notif.createdAt).toLocaleString()}
                              </p>
                            </div>
                            {!notif.isRead && (
                              <div className="w-2 h-2 rounded-full bg-brand-gold mt-2"></div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
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

