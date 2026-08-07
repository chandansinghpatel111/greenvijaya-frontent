import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import apiClient from "../api/apiClient";
import { useAuth } from "../context/AuthContext";

const AdminGuard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const authStatus = sessionStorage.getItem("adminAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const response = await apiClient.post('/auth/login', { email: userId, password });
      if (response.data.role === 'admin') {
        setIsAuthenticated(true);
        sessionStorage.setItem("adminAuth", "true");
        // Sync with global AuthContext
        login(response.data, response.data.token);
      } else {
        setError("Access Denied: You do not have admin privileges.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Admin ID or Password");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-gradient-to-br from-[#1a0c0f] to-brand-burgundy px-4 py-8">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-gold opacity-20 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-rose-500 opacity-10 blur-[100px]"></div>

        <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-[420px]">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white tracking-tight flex items-center justify-center gap-2">
              SECURE <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-[#d4af37]">ADMIN</span>
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-rose-400 to-[#d4af37] mx-auto mt-3 rounded-full opacity-80"></div>
          </div>
          
          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Login Identity</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Admin Email/ID"
                className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-rose-400/50 focus:ring-1 focus:ring-rose-400/50 outline-none transition-all placeholder:text-gray-500 text-white font-medium text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Access Key</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-5 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-rose-400/50 focus:ring-1 focus:ring-rose-400/50 outline-none transition-all placeholder:text-gray-500 text-white font-medium text-sm tracking-widest"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="no-light absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-rose-500 to-brand-gold text-white py-4 rounded-xl font-bold text-sm tracking-wide hover:shadow-[0_0_20px_rgba(225,29,72,0.3)] transform transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 uppercase"
            >
              {loading ? "Authenticating..." : "Authenticate"}
            </button>
          </form>
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-gray-400 text-xs font-bold hover:text-orange-500 transition-colors uppercase tracking-[0.2em]"
            >
              ← Return to Site
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default AdminGuard;
