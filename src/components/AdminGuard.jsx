import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const AdminGuard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = sessionStorage.getItem("adminAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (userId === "chandan@greenvijaya.com" && password === "Chandan@123") {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuth", "true");
    } else {
      alert("Invalid Admin ID or Password");
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
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-5 py-4 border-2 border-gray-100 rounded-xl focus:border-orange-500 outline-none transition-all placeholder:text-gray-300 font-medium"
                required
              />
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
