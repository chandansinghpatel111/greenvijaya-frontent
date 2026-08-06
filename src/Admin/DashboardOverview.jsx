import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";
import { Building2, Users, ClipboardList, Settings, BarChart3, Clock, AlertCircle } from "lucide-react";

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeServices: 0,
    totalPostings: 0,
    totalInquiries: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get('/admin/dashboard-stats');
        setStats(response.data);
      } catch (err) {
        setError("Failed to fetch dashboard data.");
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto w-full">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 font-medium text-sm">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Projects Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden group hover:shadow-lg hover:border-brand-gold/30 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 opacity-50 transition-all group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                <Building2 size={24} />
              </div>
            </div>
            <h2 className="text-3xl font-black text-brand-burgundy mb-1">
              {loading ? "..." : stats.totalProjects}
            </h2>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Total Projects</p>
          </div>
        </div>

        {/* Postings Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden group hover:shadow-lg hover:border-brand-gold/30 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -mr-4 -mt-4 opacity-50 transition-all group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-100 rounded-xl text-green-600">
                <ClipboardList size={24} />
              </div>
            </div>
            <h2 className="text-3xl font-black text-brand-burgundy mb-1">
              {loading ? "..." : stats.totalPostings}
            </h2>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Property Postings</p>
          </div>
        </div>

        {/* Inquiries Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden group hover:shadow-lg hover:border-brand-gold/30 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-4 -mt-4 opacity-50 transition-all group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
                <Users size={24} />
              </div>
            </div>
            <h2 className="text-3xl font-black text-brand-burgundy mb-1">
              {loading ? "..." : stats.totalInquiries}
            </h2>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Client Inquiries</p>
          </div>
        </div>

        {/* Services Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden group hover:shadow-lg hover:border-brand-gold/30 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-4 -mt-4 opacity-50 transition-all group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
                <Settings size={24} />
              </div>
            </div>
            <h2 className="text-3xl font-black text-brand-burgundy mb-1">
              {loading ? "..." : stats.activeServices}
            </h2>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Active Services</p>
          </div>
        </div>

      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center h-72 text-gray-400">
          <BarChart3 size={48} className="mb-4 text-gray-200" />
          <h3 className="text-sm font-bold uppercase tracking-widest mb-1 text-gray-500">Data Overview</h3>
          <p className="text-xs">Visual analytics coming soon</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center h-72 text-gray-400">
          <Clock size={48} className="mb-4 text-gray-200" />
          <h3 className="text-sm font-bold uppercase tracking-widest mb-1 text-gray-500">Recent Activity</h3>
          <p className="text-xs">Activity logs coming soon</p>
        </div>
      </div>

    </div>
  );
};

export default DashboardOverview;
