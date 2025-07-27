import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:2000/api', // your backend base URL + prefix
  withCredentials: true,                 // for cookies, if needed
});


// Add token from localStorage to every request if exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken")?localStorage.getItem("authToken"):sessionStorage.getItem('authToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;