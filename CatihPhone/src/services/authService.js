import axios from "axios";

export const loginRequest = async (email, password) => {
  const response = await axios.post("https://tu-api/login", {
    email,
    password,
  });
  return response.data;
};
