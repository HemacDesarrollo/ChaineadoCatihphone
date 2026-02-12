import { apiDev } from "./connect";

export const login = async (username, password) => {
  const response = await apiDev.post("/api/mobile/auth/login", {
    usuario: username,
    password,
  });

  return response.data;
};

{/* de ejemplo
import { api, apiDev } from "../conect";

export const loginUser = async (user, password) => {
    const response = await api.post("/auth/login", { user, password, origin:"app" });
    return response.data;
};

export const loginUserDev = async (user, password) => {
    const response = await apiDev.post("/auth/login", { user, password,origin:"app" });
    return response.data;
};
*/}