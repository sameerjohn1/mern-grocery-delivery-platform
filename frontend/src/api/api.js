import axios from "axios";
import { getToken, clearSession } from "../auth/authStorage";

const configuredApiUrl = import.meta.env.VITE_API_URL;
const productionApiUrl = "https://mern-grocery-delivery-platform.vercel.app/api";
const isLocalApiUrl = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/i.test(
  configuredApiUrl || "",
);

const API_BASE_URL =
  import.meta.env.PROD && isLocalApiUrl
    ? productionApiUrl
    : configuredApiUrl ||
      (import.meta.env.PROD ? productionApiUrl : "http://localhost:5000/api");

const API = axios.create({
  baseURL: API_BASE_URL,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Bust stale browser/CDN caches (prevents empty "304 Not Modified" data)
    if ((config.method || "get").toLowerCase() === "get") {
      config.params = { ...(config.params || {}), _t: Date.now() };
    }

    return config;
  },
  (error) => Promise.reject(error),
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && getToken()) {
      clearSession();
    }
    return Promise.reject(error);
  },
);

export const registerUser = (data) => API.post("/users/register", data);

export const verifyEmail = (data) => API.post("/users/verify-email", data);

export const resendOtp = (data) => API.post("/users/resend-otp", data);

export const loginUser = (data) => API.post("/users/login", data);

export const forgotPassword = (data) =>
  API.post("/users/forgot-password", data);

export const resetPassword = (data) => API.post("/users/reset-password", data);

export const getProfile = () => API.get("/users/profile");

export const getCategories = () => API.get("/categories");

export const getProducts = (params) => API.get("/products", { params });

export const getHookahs = () => API.get("/hookahs");

export const getAddresses = () => API.get("/address");

export const addAddress = (data) => API.post("/address", data);

export const updateAddress = (id, data) => API.put(`/address/${id}`, data);

export const deleteAddress = (id, data) => API.delete(`/address/${id}`, data);

export const placeOrder = (data) => API.post("/orders", data);

export const getMyOrder = () => API.get("/orders/my-orders");

export const cancelOrder = (id) =>
  API.put(`/orders/${id}`, { orderStatus: "Cancelled" });

export const createCheckoutSession = (order) =>
  API.post("/payment/create-session", { order });

export const verifyPayment = (sessionId, order) =>
  API.post("/payment/verify-payment", { sessionId, order });

export default API;
