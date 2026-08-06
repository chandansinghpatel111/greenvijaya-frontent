import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";
import { UserPlus, Key, Mail, Phone, Shield } from "lucide-react";

const AdminSignup = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New User Form State
  const [newUser, setNewUser] = useState({ name: '', email: '', mobileNumber: '', password: '', role: 'admin' });
  const [formMsg, setFormMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await apiClient.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setFormMsg({ type: '', text: '' });
    try {
      await apiClient.post('/auth/register', newUser);
      setFormMsg({ type: 'success', text: 'User created successfully!' });
      setNewUser({ name: '', email: '', mobileNumber: '', password: '', role: 'admin' });
      fetchUsers();
    } catch (error) {
      setFormMsg({ type: 'error', text: error.response?.data?.message || 'Error creating user' });
    }
  };

  const handleResetPassword = async (user) => {
    const newPassword = prompt(`Enter new password for ${user.name} (${user.email}):`);
    if (!newPassword) return;
    
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      await apiClient.post('/auth/reset-password', {
        emailOrMobile: user.email,
        newPassword: newPassword,
        confirmPassword: newPassword
      });
      alert(`Password for ${user.email} reset successfully!`);
    } catch (error) {
      console.error("Error resetting password:", error);
      alert(error.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Admin & User Management</h2>
        <p className="text-gray-500 mt-1">Create new administrators or reset passwords for existing users.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create User Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
              <UserPlus size={20} className="text-[#753441]" /> Create New User
            </h3>
            
            {formMsg.text && (
              <div className={`p-3 rounded-lg mb-4 text-sm font-bold ${formMsg.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {formMsg.text}
              </div>
            )}
            
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Name</label>
                <input required type="text" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} className="w-full border border-gray-300 p-2 rounded-lg text-sm" placeholder="Full Name" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
                <input required type="email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} className="w-full border border-gray-300 p-2 rounded-lg text-sm" placeholder="Email Address" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Number</label>
                <input required type="text" value={newUser.mobileNumber} onChange={e => setNewUser({...newUser, mobileNumber: e.target.value})} className="w-full border border-gray-300 p-2 rounded-lg text-sm" placeholder="Phone Number" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Role</label>
                <select value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})} className="w-full border border-gray-300 p-2 rounded-lg text-sm">
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Temporary Password</label>
                <input required type="password" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} className="w-full border border-gray-300 p-2 rounded-lg text-sm" placeholder="Min 6 characters" minLength={6} />
              </div>
              
              <button type="submit" className="w-full bg-[#753441] text-white py-2.5 rounded-lg font-bold text-sm hover:bg-[#5a2832] transition">
                Create Account
              </button>
            </form>
          </div>
        </div>

        {/* User List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-bold text-gray-900">All Registered Users</h3>
            </div>
            
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading users...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400 font-bold">
                      <th className="px-4 py-3">User</th>
                      <th className="px-4 py-3">Contact</th>
                      <th className="px-4 py-3 text-center">Role</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50/50">
                        <td className="px-4 py-3">
                          <div className="font-bold text-gray-900">{user.name}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-xs text-gray-600 flex items-center gap-1"><Mail size={12}/> {user.email}</div>
                          <div className="text-xs text-gray-600 flex items-center gap-1 mt-0.5"><Phone size={12}/> {user.mobileNumber || 'N/A'}</div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide
                            ${user.role === 'admin' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 
                              'bg-gray-100 text-gray-700 border border-gray-200'}`}
                          >
                            {user.role === 'admin' && <Shield size={10} />}
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button 
                            onClick={() => handleResetPassword(user)}
                            className="inline-flex items-center gap-1 bg-white border border-gray-300 text-gray-700 px-2.5 py-1.5 rounded text-xs font-bold hover:bg-gray-50 hover:text-gray-900 transition"
                          >
                            <Key size={12} /> Reset Password
                          </button>
                        </td>
                      </tr>
                    ))}
                    
                    {users.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center p-8 text-gray-500">No users found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
