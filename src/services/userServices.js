import { api } from "./api";

export const fetchUsers = async () => {
  const response = await api.get("/");
  return response.data;
};

export const createUsers = async (userData) => {
  const response = await api.post("/", userData);
  return response.data;
};

export const updateUsers = async (id, userData) => {
  const response = await api.put(`/${id}`, userData);
  return response.data;
};

export const deleteUsers = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
