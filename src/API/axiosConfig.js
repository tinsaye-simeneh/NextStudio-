import axios from 'axios';
import { message } from 'antd';
import { isAdminAuthFailure } from './adminAuth';

// Set up response interceptor to handle admin auth 401 errors globally
axios.interceptors.response.use(
  (response) => {
    // Return successful responses as-is
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      const isAdminRoute =
        currentPath.startsWith('/admindashboard') ||
        currentPath.startsWith('/administrator');

      // Only logout for admin Bearer-token failures, not card password 401s
      if (isAdminRoute && isAdminAuthFailure(error)) {
        message.error('Session expired. Please login again.');

        localStorage.clear();

        setTimeout(() => {
          window.location.href = '/administrator';
        }, 1000);
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
