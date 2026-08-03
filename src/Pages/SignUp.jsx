import { useState } from "react";
import apiClient from "../api/apiClient";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from '../assets/greenlogo.jpeg';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [role, setRole] = useState("user"); // "user" or "broker"
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateFields = () => {
    if (!name.trim()) return "Name cannot be empty.";
    if (!/^\d{10}$/.test(mobileNumber)) return "Invalid mobile number. Enter 10 digits.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return null;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setMessage("");
    const validationError = validateFields();
    if (validationError) {
      setMessage(validationError);
      return;
    }

    setLoading(true);
    try {
      await apiClient.post('/auth/register', {
        name,
        email,
        password,
        mobileNumber,
        role: role
      });

      setMessage("User successfully signed up!");

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setMobileNumber("");

      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Simple Clean Card */}
      <div className="w-full max-w-lg p-8 sm:p-10 bg-white dark:bg-slate-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-slate-100 dark:border-slate-800 transition-all max-h-[90vh] overflow-y-auto">
        
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6 hover:scale-105 transition-transform duration-300">
            <img src={logo} alt="Green Vijaya Logo" className="h-16 w-auto mx-auto rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700" />
          </Link>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
            Create an Account
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
            Join Green Vijaya today
          </p>
        </div>

        <div className="flex justify-center mb-8 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${role === 'user' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-600' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
            onClick={() => setRole('user')}
          >
            Buyer
          </button>
          <button
            type="button"
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${role === 'broker' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-600' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
            onClick={() => setRole('broker')}
          >
            Seller / Broker
          </button>
        </div>

        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#ec9322] focus:border-transparent transition-all shadow-sm"
              placeholder="John Doe"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Mobile Number</label>
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
                className="w-full p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#ec9322] focus:border-transparent transition-all shadow-sm"
                placeholder="9876543210"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#ec9322] focus:border-transparent transition-all shadow-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password</label>
              <div className="relative flex items-center w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-[#ec9322] focus-within:border-transparent transition-all overflow-hidden">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3.5 bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="no-light px-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors focus:outline-none"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Confirm Password</label>
              <div className="relative flex items-center w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-[#ec9322] focus-within:border-transparent transition-all overflow-hidden">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full p-3.5 bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="no-light px-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors focus:outline-none"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 mt-4 text-white font-extrabold rounded-xl shadow-md transition-all duration-300 ${loading ? "bg-slate-400 cursor-not-allowed" : "bg-gradient-to-r from-[#753441] to-[#ec9322] hover:shadow-lg active:scale-[0.98]"
              }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="text-center mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-sm font-medium text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} type="button" className="no-light text-slate-900 dark:text-white font-extrabold hover:underline bg-transparent !border-none">
              Login
            </button>
          </div>

          {message && (
            <div className={`mt-4 p-4 rounded-xl text-center text-sm font-bold border ${message.includes("error") || message.includes("empty") || message.includes("match") || message.includes("Invalid") ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200"}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
