import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// ✅ Add Authorization Header from Access Token
api.interceptors.request.use(
  (config) => {
    const accessToken = cookies.get('token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle Unauthorized and Forbidden globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      // Clear cookies (log out)
      cookies.remove('token');

      // Optional: Redirect to login page
      window.location.href = '/login';

      console.warn('⚠️ Token expired or unauthorized — user has been logged out.');
    }

    return Promise.reject(error);
  }
);


export default api;
