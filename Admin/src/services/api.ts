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
    const token = localStorage.getItem('admin-token');
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
export const adminAPI = {
  login: (email: string, password: string) => api.post('/admin/login', { email, password }),
  getProfile: () => api.get('/admin/profile'),
};

export const productAPI = {
  getAllProducts: () => api.get('/product'),
  getProductById: (id: string) => api.get(`/product/${id}`),
  addProduct: (productData: FormData) => api.post('/product', productData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  deleteProduct: (id: string) => api.delete(`/product/${id}`),
  updateProduct: (id: string, productData: FormData) => api.put(`/product/${id}`, productData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

export const orderAPI = {
  getAllOrders: () => api.get('/order'),
  getOrderById: (id: string) => api.get(`/order/${id}`),
  updateOrderStatus: (id: string, status: string) => api.put(`/order/${id}/status`, { status }),
};

export default api;