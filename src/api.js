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

export default api;
