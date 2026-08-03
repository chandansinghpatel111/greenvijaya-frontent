import { useState } from "react";
import apiClient from "../api/apiClient";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "../assets/login.jpg"; // Using login.jpg from assets
import { Eye, EyeOff } from "lucide-react";

const ForgotPassword = () => {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post('/auth/reset-password', {
        emailOrMobile,
        newPassword,
        confirmPassword
      });

      setMessage(response.data.message || "Password reset successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-5 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Reset Password
          </h2>
          <p className="text-center text-gray-600 mb-6 text-sm">
            Enter your registered email or mobile number to set a new password.
          </p>

          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email or Mobile Number</label>
              <input
                type="text"
                value={emailOrMobile}
                onChange={(e) => setEmailOrMobile(e.target.value)}
                required
                className="w-full mt-2 p-3 border rounded focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <div className="mt-2 flex items-center w-full border border-gray-300 rounded focus-within:ring-2 focus-within:ring-orange-500 bg-white overflow-hidden">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full p-3 border-none outline-none bg-transparent text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3.5 flex items-center justify-center text-gray-500 hover:text-gray-800 focus:outline-none bg-transparent"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <div className="mt-2 flex items-center w-full border border-gray-300 rounded focus-within:ring-2 focus-within:ring-orange-500 bg-white overflow-hidden">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full p-3 border-none outline-none bg-transparent text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="px-3.5 flex items-center justify-center text-gray-500 hover:text-gray-800 focus:outline-none bg-transparent"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 mt-4 text-white rounded transition duration-300 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <div className="text-center mt-6 text-sm">
              Remember your password?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login here
              </Link>
            </div>

            {message && (
              <p className={`mt-4 text-center text-sm ${message.includes("error") || message.includes("not match") ? "text-red-500" : "text-green-600"}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Right Side - Background Image/Video */}
      <div className="hidden md:block md:w-1/2 relative bg-slate-900">
        <img
          src={bgImage}
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-10 text-center">
          <h1 className="text-4xl font-bold mb-4 tracking-wide text-white">Reset Your Access</h1>
          <p className="text-lg text-gray-200">
            Securely regain access to your account and continue your journey with Green Vijaya.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
