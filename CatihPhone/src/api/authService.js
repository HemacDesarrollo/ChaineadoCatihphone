import { api } from "./connect";

export const login = async (usuario, password) => {
  const response = await api.post("/APP/auth/login", {
    usuario,
    password,
  });
  return response.data;
};

  export const forgotPassword = async (email) => {
  const response = await api.post("/APP/auth/forgot-password", {
    email,
  });

  return response.data;
};


