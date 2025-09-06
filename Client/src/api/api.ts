import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// User API endpoints
export const userAPI = {
  register: (userData: { name: string; email: string; password: string }) => {
    return api.post('/users/register', userData);
  },
  login: (userData: { email: string; password: string }) => {
    return api.post('/users/login', userData);
  },
  getProfile: () => {
    return api.get('/users/profile');
  },
  updateProfile: (userData: { name?: string; email?: string; password?: string }) => {
    return api.put('/users/profile', userData);
  },
};

// Product API endpoints
export const productAPI = {
  getAllProducts: () => {
    return api.get('/products');
  },
  getProductById: (id: string) => {
    return api.get(`/products/${id}`);
  },
  getProductsByCategory: (category: string) => {
    return api.get(`/products/category/${category}`);
  },
};

// Order API endpoints
export const orderAPI = {
  createOrder: (orderData: {
    items: Array<{ productId: string; quantity: number; size: string }>;
    shippingAddress: {
      name: string;
      email: string;
      address: string;
      city: string;
      postalCode: string;
      country: string;
    };
    paymentMethod: string;
  }) => {
    return api.post('/orders', orderData);
  },
  getUserOrders: () => {
    return api.get('/orders');
  },
  getOrderById: (id: string) => {
    return api.get(`/orders/${id}`);
  },
};

export default api;