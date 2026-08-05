import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess('Login successful! Redirecting...');
      setError('');
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      console.error('Error signing in:', error.message);
      setError(error.message);
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center md:justify-between px-4 sm:px-12 lg:px-32">
      {/* Full Screen Background Image */}
      <img
        src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=80"
        alt="Luxury Real Estate"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      
      {/* Subtle Overlay to make the form pop */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Left Side - Feature List */}
      <div className="hidden md:flex flex-col relative z-20 text-white max-w-lg pr-10">
        <div className="inline-block px-3 py-1 mb-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest self-start">
          Green Vijaya Infra
        </div>
        
        <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-5 text-transparent bg-clip-text bg-gradient-to-r from-white to-rose-200">
          Elevate Your Standard <br/> of Living.
        </h1>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 bg-rose-500/20 p-1.5 rounded-full border border-rose-400/30">
              <CheckCircle2 size={18} className="text-rose-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-0.5">Curated Luxury Properties</h3>
              <p className="text-rose-100/80 text-[13px] font-medium leading-snug">Exclusive masterplans selected for superior modern design and prime locations.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-0.5 bg-rose-500/20 p-1.5 rounded-full border border-rose-400/30">
              <CheckCircle2 size={18} className="text-rose-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-0.5">Prime Corridor Connectivity</h3>
              <p className="text-rose-100/80 text-[13px] font-medium leading-snug">Strategically positioned near international airports, expressways, and business hubs.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-0.5 bg-rose-500/20 p-1.5 rounded-full border border-rose-400/30">
              <CheckCircle2 size={18} className="text-rose-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-0.5">100% Legal Transparency</h3>
              <p className="text-rose-100/80 text-[13px] font-medium leading-snug">Seamless, government-approved title handover with verified legal documentation.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Form Card */}
      <div className="relative z-20 w-full max-w-[380px] bg-white rounded-[1.25rem] p-5 sm:p-6 shadow-2xl my-4">
        <div className="mb-4">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-gray-900 mb-1 tracking-tight">
            Welcome Back!
          </h2>
          <p className="text-[12px] text-gray-500 font-medium">
            Login to your account to explore your next home
          </p>
        </div>

        {success && (
          <div className="mb-3 p-2 rounded-lg bg-green-50 border border-green-100 text-green-700 text-[11px] font-medium text-center">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-3 p-2 rounded-lg bg-red-50 border border-red-100 text-red-700 text-[11px] font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-[12px] font-bold text-gray-800 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 px-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#753441]/20 focus:border-[#753441] outline-none transition-all text-[13px]"
              placeholder="Your email address"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-[12px] font-bold text-gray-800 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 px-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#753441]/20 focus:border-[#753441] outline-none transition-all text-[13px]"
                placeholder="Your password"
              />
            </div>
            <div className="flex justify-end mt-1.5">
              <a href="#" className="text-[11px] font-semibold text-gray-500 hover:text-[#753441] transition-colors underline decoration-gray-300">
                Forget your password?
              </a>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center mt-1 mb-3">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-3.5 h-3.5 text-[#753441] bg-white border-gray-300 rounded focus:ring-[#753441]/30 cursor-pointer accent-[#753441]"
            />
            <label htmlFor="remember" className="ml-2 text-[12px] font-medium text-gray-700 cursor-pointer">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#1a0c0f] to-[#3d1e24] hover:from-[#291217] hover:to-[#4e222d] text-white py-2.5 rounded-lg font-bold text-[13px] shadow-md transition-all active:scale-[0.98]"
          >
            Log In
          </button>

          <p className="text-center text-[12px] text-gray-600 mt-3 font-medium">
            Don't have an account?{' '}
            <Link to="/sign" className="text-gray-900 font-bold hover:text-[#753441] transition-colors">
              Sign up
            </Link>
          </p>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-[10px] font-bold text-gray-400 tracking-wider">
              OR
            </span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-2.5">
          <button type="button" className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-2 rounded-lg font-semibold text-[12px] hover:bg-gray-50 transition-colors">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>
          
          <button type="button" className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-2 rounded-lg font-semibold text-[12px] hover:bg-gray-50 transition-colors">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.74 3.58-.8 1.58.01 2.81.65 3.56 1.66-3.1.92-2.55 4.69.41 5.75-.72 2.05-1.66 4.41-2.63 5.56z" />
              <path d="M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.02 4.48-3.74 4.25z" />
            </svg>
            Continue with Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
