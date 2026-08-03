import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import apiClient from "../api/apiClient";
import {
  LayoutDashboard,
  Compass,
  FileText,
  Building2,
  BarChart3,
  Users,
  LogOut,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Bell,
  MessageSquare,
  User,
  Moon,
  Sun
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const { isDarkMode, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await apiClient.get('/admin/notifications');
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await apiClient.put(`/admin/notifications/${id}/read`);
      setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  };

  // Touch gesture handlers for mobile sidebar
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // Close if swiped left > 50px
    if (diff > 50) {
      setMobileOpen(false);
    }
    setTouchStartX(null);
  };

  const menuItems = [
    { name: "Dashboard Overview", path: "/admin", icon: LayoutDashboard, exact: true },
    { name: "Admin Profile", path: "/admin/profile", icon: User },
    { name: "Project Explore", path: "/admin/ProjectExplore", icon: Compass },
    { name: "Post Property", path: "/admin/post-property", icon: FileText },
    { name: "Construction Status", path: "/admin/Buys", icon: BarChart3 },
    { name: "Property Approvals", path: "/admin/approvals", icon: ShieldCheck },
    { name: "Registered Sellers", path: "/admin/sellers", icon: Users },
    { name: "Enquiries", path: "/admin/enquiries", icon: MessageSquare },
  ];

  const handleNavClick = (item) => {
    if (item.external) {
      window.location.href = item.path;
    } else {
      navigate(item.path);
    }
    setMobileOpen(false);
  };

  return (
    <div className="flex h-screen w-full bg-slate-100 dark:bg-slate-900 font-sans overflow-hidden transition-colors duration-300">
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 dark:bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        />
      )}

      {/* Vibrant Glassmorphic Left Sidebar */}
      <aside
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`fixed lg:static top-0 left-0 z-50 h-full flex flex-col transition-all duration-300 ease-in-out bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-r border-slate-200 dark:border-slate-800 shadow-[4px_0_24px_rgba(117,52,65,0.05)] dark:shadow-none shrink-0 ${mobileOpen ? "translate-x-0 w-full sm:w-80" : "-translate-x-full lg:translate-x-0"
          } ${sidebarOpen ? "lg:w-64" : "lg:w-20"}`}
      >
        {/* Sidebar Header & Brand Stamp */}
        <div className="flex items-center justify-between h-20 px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-transparent">
          <div
            onClick={() => { navigate("/admin"); setMobileOpen(false); }}
            className={`flex items-center gap-3 cursor-pointer overflow-hidden transition-all ${!sidebarOpen && "lg:justify-center lg:w-full"}`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#753441] to-[#ec9322] text-white font-black text-lg tracking-wider shadow-md shadow-rose-200 dark:shadow-none">
              GV
            </div>
            <div className={`flex flex-col transition-opacity duration-200 ${!sidebarOpen ? "lg:hidden opacity-0 w-0" : "opacity-100"}`}>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-tight">GREEN VIJAYA</span>
              <span className="text-[10px] uppercase tracking-widest text-[#753441] dark:text-rose-400 font-bold flex items-center gap-1">
                <Sparkles size={10} className="text-[#ec9322]" /> Admin Portal
              </span>
            </div>
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto py-4 px-3 sm:px-4 space-y-2 custom-scrollbar">
          {!sidebarOpen && (
            <div className="hidden lg:block text-center text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
              Menu
            </div>
          )}
          {sidebarOpen && (
            <div className="px-2 text-[11px] font-extrabold text-[#753441]/70 dark:text-slate-400 uppercase tracking-widest mb-3">
              Management & Controls
            </div>
          )}

          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path) && item.path !== "/admin";

            return (
              <button
                key={index}
                onClick={() => handleNavClick(item)}
                title={!sidebarOpen ? item.name : undefined}
                className={`w-full flex items-center gap-2 px-4 py-4 rounded-xl font-semibold text-sm duration-300 relative overflow-hidden transition-all ${isActive
                  ? "bg-gradient-to-r from-rose-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/80 text-[#753441] dark:text-rose-400 border border-rose-100 dark:border-slate-700 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-[#753441] dark:hover:text-rose-300 hover:bg-rose-50/50 dark:hover:bg-slate-800/50 border border-transparent"
                  } ${!sidebarOpen ? "lg:justify-center lg:px-0" : ""}`}
              >
                <Icon
                  size={21}
                  className={`shrink-0 transition-colors ${isActive ? "text-[#ec9322] dark:text-rose-400" : "text-slate-400"}`}
                />

                <span className={`truncate tracking-wide transition-opacity duration-200 ${!sidebarOpen ? "lg:hidden opacity-0 w-0" : "opacity-100"}`}>
                  {item.name}
                </span>

                {sidebarOpen && isActive && (
                  <ChevronRight size={16} className="ml-auto text-[#753441]/50 dark:text-rose-400/50 font-black" />
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer & Logout */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 shrink-0">

          <button
            onClick={handleLogout}
            title={!sidebarOpen ? "Logout session" : undefined}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-rose-600 hover:border-rose-500 hover:text-white hover:shadow-md hover:shadow-rose-500/20 text-slate-700 dark:text-slate-200 font-bold text-sm transition-all duration-300 border border-slate-200 dark:border-slate-800 ${!sidebarOpen ? "lg:justify-center lg:px-0" : ""
              }`}
          >
            <LogOut size={20} className="shrink-0" />
            <span className={`truncate ${!sidebarOpen ? "lg:hidden" : ""}`}>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Right Side Main Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        {/* Persistent Top Nav & Hamburger Menu Header */}
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-8 shrink-0 z-30 transition-colors duration-300">
          <div className="flex items-center gap-4">
            {/* Hamburger button visible on full page (desktop toggle) & mobile */}
            <button
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setMobileOpen(true);
                } else {
                  setSidebarOpen(!sidebarOpen);
                }
              }}
              aria-label="Toggle Navigation Sidebar"
              className="flex items-center justify-center h-11 w-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-950 hover:text-white dark:hover:bg-slate-700 hover:border-transparent transition-colors duration-200 focus:outline-none"
            >
              {sidebarOpen ? <Menu size={22} className="hidden lg:block" /> : <Menu size={22} className="hidden lg:block transform rotate-180" />}
              <Menu size={22} className="block lg:hidden" />
            </button>

            <div>
              <h2 className="text-base sm:text-xl font-black text-slate-950 dark:text-white tracking-tight truncate">
                Green Vijaya Executive Dashboard
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-semibold truncate hidden sm:block">
                Manage residential estates, commercial postings, and system configurations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Bell size={22} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>

              {/* Dropdown Menu */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 z-50 overflow-hidden">
                  <div className="p-3 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-800">Notifications</h3>
                    <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                      {unreadCount} New
                    </span>
                  </div>
                  <div className="max-h-80 overflow-y-auto custom-scrollbar">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div
                          key={notif._id}
                          onClick={() => {
                            if (!notif.isRead) markAsRead(notif._id);
                          }}
                          className={`p-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors ${!notif.isRead ? 'bg-blue-50/50' : ''}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex-shrink-0">
                              <Bell size={16} className={!notif.isRead ? 'text-blue-500' : 'text-slate-400'} />
                            </div>
                            <div>
                              <p className={`text-sm ${!notif.isRead ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>{notif.title}</p>
                              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{notif.message}</p>
                              <p className="text-[10px] text-slate-400 mt-1">{new Date(notif.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-slate-500 text-sm">
                        No notifications found.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Admin Page Content Container */}
        <main className="flex-1 overflow-y-auto bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 custom-scrollbar transition-colors duration-300">
          <div className="max-w-7xl mx-auto pb-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
