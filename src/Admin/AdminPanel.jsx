import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";
import {
  Building2,
  Briefcase,
  FileText,
  MessageSquare,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  Compass,
  BarChart3,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

const AdminPanel = () => {
  const navigate = useNavigate();

  const [dashboardStats, setDashboardStats] = useState({
    totalProjects: 0,
    activeServices: 8,
    totalPostings: 0,
    totalInquiries: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await apiClient.get('/admin/dashboard-stats');
        setDashboardStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    {
      title: "Total Projects",
      count: dashboardStats.totalProjects + " +",
      category: "Properties",
      icon: Building2,
      badgeColor: "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 font-bold",
      iconBg: "bg-rose-100 text-[#753441] dark:bg-slate-800 dark:text-rose-400"
    },
    {
      title: "Active Services",
      count: dashboardStats.activeServices + " Core",
      category: "Offerings",
      icon: Briefcase,
      badgeColor: "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 font-bold",
      iconBg: "bg-orange-100 text-[#ec9322] dark:bg-slate-800 dark:text-orange-400"
    },
    {
      title: "Total Postings",
      count: dashboardStats.totalPostings,
      category: "Listings",
      icon: FileText,
      badgeColor: "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 font-bold",
      iconBg: "bg-emerald-100 text-emerald-600 dark:bg-slate-800 dark:text-emerald-400"
    },
    {
      title: "Client Inquiries",
      count: dashboardStats.totalInquiries,
      category: "Engagement",
      icon: MessageSquare,
      badgeColor: "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 font-bold",
      iconBg: "bg-blue-100 text-blue-600 dark:bg-slate-800 dark:text-blue-400"
    }
  ];

  const quickActions = [
    {
      title: "Explore City Projects",
      description: "Manage city listings, locations, prices, and architectural details.",
      path: "/admin/ProjectExplore",
      icon: Compass,
      tag: "Properties"
    },
    {
      title: "Post New Property",
      description: "Upload floor plans, pricing tiers, amenities, and property photographs.",
      path: "/admin/Postproject",
      icon: FileText,
      tag: "Publishing"
    },
    {
      title: "Construction Status",
      description: "Review client purchasing pipelines, site updates, and construction phases.",
      path: "/admin/Buys",
      icon: BarChart3,
      tag: "Operations"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Vibrant Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#753441] to-[#ec9322] p-6 sm:p-8 text-white shadow-xl shadow-rose-200/50 dark:shadow-none border border-[#753441]/20 dark:border-slate-800">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-2xl sm:text-4xl lg:text-3xl font-bold tracking-tight text-white leading-tight">
            Welcome, Administrator
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Monitor property lifecycles, curate luxury developments, and control ecosystem metrics across all Green-Vijaya real estate verticals.
          </p>
        </div>
      </div>

      {/* Key Metric Stats Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
            <TrendingUp size={20} className="text-slate-900 dark:text-slate-300" />
            Real Estate Analytics & Performance
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none flex flex-col justify-between transition-colors duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {stat.category}
                    </span>
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center transition-colors duration-300 ${stat.iconBg}`}>
                      <Icon size={20} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
                    {stat.count}
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300 mt-1">
                    {stat.title}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className={`text-[11px] px-2.5 py-1 rounded-full border ${stat.badgeColor}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Action Operations Center */}
      {/* <div>
        <div className="flex items-center justify-between mb-4 mt-6">
          <h2 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight flex items-center gap-2">
            <Sparkles size={20} className="text-slate-900" />
            Quick Administration Shortcuts
          </h2>
          <span className="text-xs font-bold text-slate-900 hover:underline cursor-pointer">View All Tools</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <div
                key={idx}
                onClick={() => navigate(action.path)}
                className="group bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 hover:border-slate-950 transition-colors duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-slate-100 text-slate-900 group-hover:bg-slate-950 group-hover:text-white flex items-center justify-center transition-colors duration-200">
                      <Icon size={24} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200 group-hover:bg-slate-950 group-hover:text-white group-hover:border-transparent transition-colors duration-200">
                      {action.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-950 group-hover:text-black tracking-tight transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal mt-2">
                    {action.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between font-extrabold text-sm text-slate-950">
                  <span>Access Module</span>
                  <ArrowUpRight size={18} className="text-slate-950" />
                </div>
              </div>
            );
          })}
        </div>
      </div> */}

      {/* System Security & Integrity Banner */}
      {/* <div className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-slate-100 border border-slate-200 text-slate-950 flex items-center justify-center shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="text-base font-black text-slate-950 flex items-center gap-2">
              System Security & Encryption Active
              <CheckCircle2 size={16} className="text-slate-950 shrink-0" />
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              All real estate postings and Firebase communications are protected under enterprise Grade SSL encryption.
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AdminPanel;