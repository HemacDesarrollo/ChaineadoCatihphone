import axios from "axios";
import * as SecureStore from "expo-secure-store";

const BASE_URLS = {
  produccion: "http://192.168.44.179:3003"
};
export const API_BASE_URL = BASE_URLS.produccion;

const api = axios.create({
  baseURL: BASE_URLS.produccion,
  headers: {
    "Content-Type": "application/json", 
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("CATI_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { api };
