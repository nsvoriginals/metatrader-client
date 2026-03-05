import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export const authAPI = {
  login: (email, password) =>
    axiosInstance.post('/api/auth/login', { email, password }),

  register: (email, username, password) =>
    axiosInstance.post('/api/auth/register', { email, username, password }),

  me: () => axiosInstance.get('/api/auth/me'),
};

export const orderAPI = {
  placeOrder: (orderData) =>
    axiosInstance.post('/api/order/placeorder', orderData),

  getOrderDetails: (id) =>
    axiosInstance.get(`/api/order/orderdetils/${id}`),
};

export const portfolioAPI = {
  create: () => axiosInstance.post('/api/portfolio'),
  
  get: () => axiosInstance.get('/api/portfolio'),
};

export const tradeAPI = {
  getAll: () => axiosInstance.get('/api/trades'),
  
  getBuy: () => axiosInstance.get('/api/trades/buy'),
  
  getSell: () => axiosInstance.get('/api/trades/sell'),
  
  getById: (id) => axiosInstance.get(`/api/trades/${id}`),
};

export default axiosInstance;
