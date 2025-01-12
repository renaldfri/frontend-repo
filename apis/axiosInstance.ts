import { LoggedUser } from '@/app/LoggedUser';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Add a request interceptor to include auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const userObjectString  = localStorage.getItem('user');

    const user : LoggedUser = userObjectString == null ? null : JSON.parse(userObjectString);
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
