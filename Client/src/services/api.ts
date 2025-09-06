import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
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

// API endpoints
export const userAPI = {
  login: (email: string, password: string) => api.post('/user/login', { email, password }),
  register: (name: string, email: string, password: string) => api.post('/user/register', { name, email, password }),
  getProfile: () => api.get('/user/profile'),
};

export const productAPI = {
  getAllProducts: () => api.get('/product'),
  getProductById: (id: string) => api.get(`/product/${id}`),
  searchProducts: (query: string) => api.get(`/product/search?q=${query}`),
};

export default api;