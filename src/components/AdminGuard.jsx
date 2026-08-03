import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import apiClient from "../api/apiClient";

const AdminGuard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = sessionStorage.getItem("adminAuth");
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (authStatus === "true" && (user.role === "admin" || user.role === "Admin")) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await apiClient.post('/auth/login', { email: userId, password });
      if (data.role === 'admin' || data.role === 'Admin') {
        localStorage.setItem('currentUser', JSON.stringify(data));
        sessionStorage.setItem("adminAuth", "true");
        setIsAuthenticated(true);
      } else {
        alert("Access Denied: You do not have admin privileges.");
      }
    } catch (error) {
      alert("Invalid Admin ID or Password");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 to-red-600 px-4 py-8">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-gray-800 tracking-tighter">SECURE <span className="text-orange-500">ADMIN</span></h2>
            <div className="h-1 w-20 bg-orange-500 mx-auto mt-2 rounded-full"></div>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Login Identity</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Admin Email/ID"
                className="w-full px-5 py-4 border-2 border-gray-100 rounded-xl focus:border-orange-500 outline-none transition-all placeholder:text-gray-300 font-medium"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Access Key</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className=" w-full px-5 py-4 border-2 border-gray-100 rounded-xl focus:border-orange-500 outline-none transition-all placeholder:text-gray-300 font-medium pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transform transition-all active:scale-95 shadow-xl hover:shadow-orange-200"
            >
              AUTHENTICATE
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
