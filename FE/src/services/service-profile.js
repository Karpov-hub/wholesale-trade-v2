import { api } from "../boot/axios.js";
async function getData({ session_token }) {
  const response = await api.post("user/profile/get-data", {
    session_token,
  });
  return response.data;
}
async function updateBlockingUser({ id }) {
  const response = await api.post("/profile/update-blocking-user", {
    id,
  });
  return response.data;
}
async function updateUser({ session_token }) {
  const response = await api.post("/profile/update-users", {
    session_token,
  });
  return response.data;
}
async function updateUserPassword({ session_token, password }) {
  const response = await api.post("/profile/update-user-password", {
    session_token,
    password,
  });
  return response.data;
}

async function updateUsersPassword({ id }) {
  const response = await api.post("/profile/update-users-password", {
    id,
  });
  return response.data;
}
async function deleteUsers({ session_token, id_user }) {
  const response = await api.post("/profile/delete-user", {
    session_token,
    id_user,
  });
  return response.data;
}
export {
  getData,
  updateBlockingUser,
  updateUser,
  updateUserPassword,
  deleteUsers,
  updateUsersPassword,
};
