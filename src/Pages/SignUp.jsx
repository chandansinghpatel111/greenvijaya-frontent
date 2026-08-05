import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { 
  User, Mail, Phone, Lock, Eye, EyeOff, 
  Home, Calendar, Cpu, ShieldCheck, ArrowRight, Shield 
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import bgImage from "../assets/Sign.jpg";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const validateFields = () => {
    if (!name.trim()) return "Name cannot be empty.";
    if (!/^\d{10}$/.test(mobileNumber)) return "Invalid mobile number. Enter 10 digits.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";
    if (!agreed) return "You must agree to the Terms & Conditions.";
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "usersunique", user.uid), {
        name,
        email,
        mobileNumber,
        createdAt: new Date().toISOString(),
      });

      setMessage("User successfully signed up!");

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setMobileNumber("");
      setAgreed(false);

      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      const errorMsg =
        error.code === "auth/email-already-in-use"
          ? "Email already in use. Try another one."
          : error.code === "auth/invalid-email"
            ? "Invalid email format."
            : error.code === "auth/weak-password"
              ? "Password is too weak. Use a stronger password."
              : "An error occurred. Please try again.";
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="h-screen w-full flex justify-center items-center p-4 font-sans overflow-hidden relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      <div className="w-full max-w-[360px] bg-white px-[24px] py-[16px] rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex flex-col border border-gray-100 relative z-10">
        
        {/* Header Section */}
        <div className="mb-3 text-center flex flex-col items-center">
          <div className="flex items-center justify-center mb-1">
             <Home className="text-[#753441]" size={18} />
          </div>
          <p className="text-[8px] font-bold tracking-[0.15em] uppercase mb-1">
            <span className="text-[#753441]">WELCOME TO</span> <span className="text-[#FFB6C1]">GREEN VIJYA</span>
          </p>
          <h2 className="text-[20px] font-serif leading-tight mb-1 text-gray-900">
            Create Your Account
          </h2>
          <div className="w-6 h-[2px] bg-[#FFB6C1] mb-1"></div>
          <p className="text-gray-600 text-[9px] font-medium">
            Join us and start your journey to the perfect property.
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-[8px] flex-grow flex flex-col">
          
          {/* Full Name */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={14} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Full Name"
              className="w-full h-[38px] pl-8 pr-3 bg-white border border-gray-200 rounded-xl focus:border-[#753441] focus:ring-1 focus:ring-[#753441] outline-none text-[12px] transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={14} className="text-gray-400" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email Address"
              className="w-full h-[38px] pl-8 pr-3 bg-white border border-gray-200 rounded-xl focus:border-[#753441] focus:ring-1 focus:ring-[#753441] outline-none text-[12px] transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone size={14} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              placeholder="Phone Number"
              className="w-full h-[38px] pl-8 pr-3 bg-white border border-gray-200 rounded-xl focus:border-[#753441] focus:ring-1 focus:ring-[#753441] outline-none text-[12px] transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={14} className="text-gray-400" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="w-full h-[38px] pl-8 pr-3 bg-white border border-gray-200 rounded-xl focus:border-[#753441] focus:ring-1 focus:ring-[#753441] outline-none text-[12px] transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={14} className="text-gray-400" />
            </div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm Password"
              className="w-full h-[38px] pl-8 pr-3 bg-white border border-gray-200 rounded-xl focus:border-[#753441] focus:ring-1 focus:ring-[#753441] outline-none text-[12px] transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start gap-1.5 pt-0.5 pb-0.5">
            <div className="flex items-center h-4">
              <input
                id="terms"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-3 h-3 rounded-sm border-gray-300 text-[#753441] focus:ring-[#753441] accent-[#753441]"
              />
            </div>
            <label htmlFor="terms" className="text-[9px] text-gray-600 font-medium">
              Agree to <a href="#" className="text-[#753441] hover:underline">T&C</a> and <a href="#" className="text-[#753441] hover:underline">Privacy Policy</a>
            </label>
          </div>

          {message && (
            <div className={`p-1.5 text-[9px] rounded-xl ${message.includes("success") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
              {message}
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-auto">
            <button
              type="submit"
              disabled={loading}
              className={`w-full h-[38px] flex items-center justify-center gap-2 text-white rounded-xl transition-all duration-300 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-[#1a0c0f] to-[#3d1e24] hover:from-[#291217] hover:to-[#4e222d] shadow-lg shadow-[#1a0c0f]/20 active:scale-[0.98]"
              }`}
            >
              <span className="font-semibold text-[11px]">
                {loading ? "Creating Account..." : "Create My Account"}
              </span>
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center my-2.5">
          <div className="flex-grow border-t border-gray-100"></div>
          <span className="mx-2.5 text-[8px] font-bold text-gray-400 uppercase tracking-wider">Or continue with</span>
          <div className="flex-grow border-t border-gray-100"></div>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 h-[34px] border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <FcGoogle size={14} />
            <span className="text-[9px] font-semibold text-gray-700">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 h-[34px] border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <FaApple size={14} className="text-black" />
            <span className="text-[9px] font-semibold text-gray-700">Apple</span>
          </button>
        </div>

        {/* Login Link */}
        <div className="mt-2.5 text-center">
          <p className="text-[9px] text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-[#753441] font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default SignUp;

