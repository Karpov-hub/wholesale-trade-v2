import { api } from "src/boot/axios";

export async function signin({ phone, password }) {
  const response = await api.post("auth/signin", { phone, password });
  return response.data;
}
export async function refreshToken() {
  const response = await api.post("auth/refreshToken");
  return response.data;
}
export async function logout() {
  const response = await api.post("auth/logout");
  return response.data;
}
