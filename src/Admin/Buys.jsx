import { useState, useEffect } from "react";
import apiClient from '../api/apiClient'; 

const Buys = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch contacts from backend
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get('/admin/users');
        setContacts(data);
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setErrorMsg("Failed to fetch contacts.");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto transition-colors duration-300">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Contact Massage</h2>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
        {loading ? (
          <div className="p-10 text-center text-gray-500 font-semibold animate-pulse">
            Loading contacts...
          </div>
        ) : errorMsg ? (
          <div className="p-10 text-center text-red-500 font-semibold">
            {errorMsg}
          </div>
        ) : contacts.length === 0 ? (
          <div className="p-10 text-center text-gray-500 font-semibold">
            No contacts available.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-300 text-[11px] uppercase tracking-wider font-bold transition-colors duration-300">
                  <th className="p-4 font-bold">Name</th>
                  <th className="p-4 font-bold">Role</th>
                  <th className="p-4 font-bold">Email</th>
                  <th className="p-4 font-bold">Mobile Number</th>
                  <th className="p-4 font-bold">Address</th>
                  <th className="p-4 font-bold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {contacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors duration-200">
                    <td className="p-4">
                      <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">{contact.name || "N/A"}</p>
                    </td>
                    <td className="p-4 text-sm text-gray-700 dark:text-slate-300 capitalize">
                      {contact.role || "N/A"}
                    </td>
                    <td className="p-4 text-sm text-gray-700 dark:text-slate-300">
                      {contact.email || "N/A"}
                    </td>
                    <td className="p-4 text-sm font-semibold text-gray-900 dark:text-white">
                      {contact.mobileNumber || "N/A"}
                    </td>
                    <td className="p-4 text-sm text-gray-700 dark:text-slate-300">
                      {contact.address || "N/A"}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase ${
                        contact.status === 'active' ? 'bg-green-100 text-green-800' :
                        contact.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {contact.status || 'Active'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buys;
