


import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const createProduct = (data) => {
  return API.post('/products', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const getProductById = (id) => {
  return API.get(`/products/${id}`);
};

export const updateProduct = (id, data) => {
  return API.put(
    `/products/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
};