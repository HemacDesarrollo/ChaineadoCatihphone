import axios from "axios";
import * as SecureStore from "expo-secure-store";

const BASE_URLS = {
  produccion: "http://192.168.44.34:3003"
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

import { Alert } from "react-native";

api.interceptors.response.use(
  (response) => response,
  async (error) => {

    if (error.response?.status === 401) {
      console.log("TOKEN EXPIRADO O INVALIDO");

      await SecureStore.deleteItemAsync("CATI_token");


    }

    return Promise.reject(error);
  }
);

export { api };
