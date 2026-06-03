


import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const createProduct = (data) => {
  const token = localStorage.getItem('token');
  const headers = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  return API.post('/products', data, { headers });
};

export const getProductById = (id) => {
  return API.get(`/products/${id}`);
};

export const updateProduct = (id, data) => {
  const token = localStorage.getItem('token');
  const headers = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  return API.put(`/products/${id}`, data, { headers });
};