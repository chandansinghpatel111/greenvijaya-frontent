import { useState } from 'react';
import apiClient from '../api/apiClient';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import logo from '../assets/greenlogo.jpeg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiClient.post('/auth/login', { email, password });
      localStorage.setItem('currentUser', JSON.stringify(data));
      setSuccess('Login successful! Redirecting...');
      setError('');
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      console.error('Error signing in:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Failed to login');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Simple Clean Card */}
      <div className="w-full max-w-md p-8 sm:p-10 bg-white dark:bg-slate-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-slate-100 dark:border-slate-800 transition-all">
        
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6 hover:scale-105 transition-transform duration-300">
            <img src={logo} alt="Green Vijaya Logo" className="h-16 w-auto mx-auto rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700" />
          </Link>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
            Log in to your Green Vijaya account
          </p>
        </div>

        {success && (
            <div className="mb-6 p-4 rounded-xl bg-green-50 text-green-700 text-sm font-bold border border-green-200 text-center">
                {success}
            </div>
        )}
        {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 text-sm font-bold border border-red-200 text-center">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#ec9322] focus:border-transparent transition-all shadow-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                Password
                </label>
                <span
                    onClick={() => navigate('/forgot-password')}
                    className="text-xs font-bold text-[#ec9322] cursor-pointer hover:text-[#753441] transition-colors"
                >
                Forgot Password?
                </span>
            </div>
            <div className="relative flex items-center w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-[#ec9322] focus-within:border-transparent transition-all overflow-hidden">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="no-light px-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors focus:outline-none"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-gradient-to-r from-[#753441] to-[#ec9322] text-white font-extrabold py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98]"
          >
            Log In
          </button>

          <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/sign')}
              className="text-slate-900 dark:text-white font-extrabold cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
