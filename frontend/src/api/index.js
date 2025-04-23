import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("Respuesta recibida:", response); // Debug
    return response;
  },
  (error) => {
    console.error("Error en la respuesta:", error); // Debug
    return Promise.reject(error);
  }
);

export default api;
