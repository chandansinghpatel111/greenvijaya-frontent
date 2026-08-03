import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import { useNavigate } from 'react-router-dom';

const Enquiries = () => {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await apiClient.get('/enquiries');
      setEnquiries(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch enquiries.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-slate-500 dark:text-slate-400 font-semibold transition-colors duration-300">
        Loading...
      </div>
    );
  }
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="p-6 transition-colors duration-300">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Property Enquiries</h1>

      {enquiries.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-center transition-colors duration-300">
          No enquiries found.
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-300 text-[11px] uppercase tracking-wider font-bold transition-colors duration-300">
                  <th className="p-4 font-semibold">User Details</th>
                  <th className="p-4 font-semibold">Message</th>
                  <th className="p-4 font-semibold">Property</th>
                  <th className="p-4 font-semibold">Listed By</th>
                  <th className="p-4 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {enquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200">
                    <td className="p-4">
                      <div className="font-bold text-slate-800 dark:text-white">{enq.name || enq.user?.name || 'N/A'}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">{enq.email || enq.user?.email || 'N/A'}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">{enq.phone || enq.user?.mobileNumber || 'N/A'}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-slate-700 dark:text-slate-300 max-w-xs">{enq.message || <span className="italic text-slate-400 dark:text-slate-500">No message</span>}</div>
                    </td>
                    <td className="p-4">
                      <div
                        onClick={() => enq.property && navigate('/listing-detail', { state: { project: enq.property } })}
                        className={`font-bold text-sm ${enq.property ? 'text-[#ec9322] hover:underline cursor-pointer' : 'text-slate-500 dark:text-slate-400'}`}
                      >
                        {enq.property?.title || 'Unknown Property'}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">₹{enq.property?.price || 'N/A'}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-slate-800 dark:text-slate-200 font-medium">{enq.broker?.name || 'N/A'}</div>
                    </td>
                    <td className="p-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enquiries;
