import api from "./index";

export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res; // Devuelve la respuesta completa
};
