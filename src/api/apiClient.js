import axios from 'axios';

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const apiClient = axios.create({
  baseURL: isLocal ? 'http://localhost:5000/api' : 'https://greenvijaya-backend-psi.vercel.app/api',
});

// Add a request interceptor to include the JWT token
apiClient.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
