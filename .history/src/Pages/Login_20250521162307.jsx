import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="max-w-md w-full">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Login
          </h2>

          {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>


            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition duration-300"
            >
              Log In
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{' '}
              <span
                onClick={() => navigate('/sign')}
                className="text-orange-500 cursor-pointer underline hover:text-orange-600"
              >
                Sign up
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="https://pnghq.com/wp-content/uploads/pnghq.com-login-icon-transparent-pn-2-1536x1356.png" // Replace with your own image URL
          alt="Real estate background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
