import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//Dashboard

export const getDashboard = () => API.get("/admin");

// orders
export const getAllOrders = (params) => API.get("/admin/orders", { params });

export const getSingleOrder = (id) => API.get(`/admin/orders/${id}`);

export const updateOrderStatus = (id, status) =>
  API.put(`/admin/orders/${id}/status`, {
    orderStatus: status,
  });

export const deleteOrder = (id) => API.delete(`/admin/orders/${id}`);

// Categories
export const getCategories = () => API.get("/categories");

export const getCategory = (id) => API.get(`/categories/${id}`);

export const createCategory = (data) => API.post(`/categories/add`, data);

export const updateCategory = (id, data) => API.put(`/categories/${id}`, data);

export const deleteCategory = (id) => API.delete(`/categories/${id}`);

// Products
export const getProducts = (params = {}) => API.get("/products", { params });

export const getProduct = (id) => API.get(`/products/${id}`);

export const createProducts = (data) => API.post("products/add", data);

export const updateProduct = (id, data) => API.put(`/products/${id}`, data);

export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Catalog products (legacy /hookahs API and Hookah model retained for compatibility)
export const getCatalogProducts = () => API.get("/hookahs");

export const getCatalogProduct = (id) => API.get(`/hookahs/${id}`);

export const createCatalogProduct = (data) => API.post("/hookahs", data);

export const updateCatalogProduct = (id, data) => API.put(`/hookahs/${id}`, data);

export const deleteCatalogProduct = (id) => API.delete(`/hookahs/${id}`);

// Upload images
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await API.post("/upload", formData);

  console.log("UPLOAD API RESPONSE:", response.data);

  return response.data;
};

export default API;
