import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import { User, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";

const AdminProfile = () => {
  const [userData, setUserData] = useState(null);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setUserData(user);
    }
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (newPassword !== confirmPassword) {
      return setMessage({ text: 'New passwords do not match', type: 'error' });
    }

    if (newPassword.length < 6) {
      return setMessage({ text: 'Password must be at least 6 characters', type: 'error' });
    }

    setLoading(true);
    try {
      const res = await apiClient.put('/auth/change-password', {
        currentPassword,
        newPassword
      });
      setMessage({ text: res.data.message || 'Password changed successfully', type: 'success' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'Failed to change password',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return <div className="p-8 text-slate-500 font-bold animate-pulse">Loading profile configuration...</div>;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight flex items-center gap-2 transition-colors duration-300">
          <User size={21} className="text-slate-900 dark:text-slate-300" />
          Admin Profile Configuration
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Details Card (Left - 1 col) */}
        <div className="col-span-1 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none h-fit transition-colors duration-300">
          <div className="w-32 h-32 bg-slate-50 dark:bg-slate-800 p-1.5 rounded-full shadow-sm border border-slate-100 dark:border-slate-700 shrink-0 flex justify-center items-center mb-5 relative transition-colors duration-300">
            {userData.photoURL ? (
              <img src={userData.photoURL} alt="Profile" loading="lazy" className="w-full h-full object-cover rounded-full" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#753441] to-[#ec9322] rounded-full flex justify-center items-center text-white text-4xl font-bold shadow-inner">
                {userData.name?.[0]?.toUpperCase()}
              </div>
            )}
            <div className="absolute bottom-1 right-1 h-5 w-5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
          </div>

          <h2 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight transition-colors duration-300">{userData.name}</h2>
          <p className="text-slate-500 dark:text-slate-400 font-semibold mt-1.5 transition-colors duration-300">{userData.email}</p>
          <p className="text-slate-500 dark:text-slate-400 font-semibold transition-colors duration-300">{userData.mobileNumber}</p>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 w-full transition-colors duration-300">
            <span className="inline-flex w-full justify-center px-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-300 text-[11px] font-black rounded-full uppercase tracking-widest border border-slate-200 dark:border-slate-700 transition-colors duration-300">
              System Administrator
            </span>
          </div>
        </div>

        {/* Change Password Card (Right - 2 cols) */}
        <div className="col-span-1 lg:col-span-2 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none transition-colors duration-300">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white tracking-tight flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
            <ShieldCheck size={22} className="text-slate-900 dark:text-slate-300" />
            Security Settings & Credentials
          </h2>

          {message.text && (
            <div className={`p-4 rounded-xl mb-6 text-sm font-semibold flex items-center gap-2 ${message.type === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800/30' : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-800/30'}`}>
              {message.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
              {message.text}
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-5 max-w-md">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-300 mb-1.5 transition-colors duration-300">Current Password</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-3.5 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#753441] focus:border-[#753441] dark:focus:ring-rose-400 dark:focus:border-rose-400 outline-none transition-all bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
                placeholder="Enter current password"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-300 mb-1.5 transition-colors duration-300">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3.5 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#753441] focus:border-[#753441] dark:focus:ring-rose-400 dark:focus:border-rose-400 outline-none transition-all bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
                placeholder="Enter new password (min. 6 characters)"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-300 mb-1.5 transition-colors duration-300">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3.5 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#753441] focus:border-[#753441] dark:focus:ring-rose-400 dark:focus:border-rose-400 outline-none transition-all bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
                placeholder="Repeat new password"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-4 py-2 text-sm bg-slate-900 hover:bg-slate-800 dark:bg-rose-600 dark:hover:bg-rose-500 text-white font-semibold rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-2"
              >
                {loading ? 'Updating Security...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
};

export default AdminProfile;
