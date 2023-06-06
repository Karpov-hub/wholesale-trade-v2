import { api } from "../boot/axios.js";
// app.use("/auth", authRouter);

async function signup({ first_name, last_name, middle_name, phone, password }) {
  const response = await api.post("user/auth/signup", {first_name, last_name, middle_name, phone, password });
  return response.data;
}
async function signin({ phone, password }) {
  const response = await api.post("user/auth/signin", { phone, password });
  return response.data;
}
async function logout({ session_token }) {
  const response = await api.post("auth/logout", { session_token });
  return response.data;
}
async function refreshToken({ session_token }) {
  const response = await api.post("auth/refreshToken", { session_token });
  return response.data;
}

export { signup, signin, refreshToken, logout };
