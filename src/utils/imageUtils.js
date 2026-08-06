export const getImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  
  const defaultUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://greenvijaya-backend-psi.vercel.app';
  const serverUrl = import.meta.env.VITE_API_BASE_URL 
    ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') 
    : defaultUrl;
    
  const normalized = url.replace(/\\/g, '/');
  return `${serverUrl}/${normalized.startsWith('/') ? normalized.slice(1) : normalized}`;
};
