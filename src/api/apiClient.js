import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
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
