import { api } from "src/boot/axios";
import { convertObjectToCamelCase } from "src/helpers/mapHelper";

export async function updateUserPassword(password) {
  const response = await api.post("user/profile/update-user-password", {
    password,
  });
  return response.data;
}

export async function getData() {
  const response = await api.post("user/profile/get-data");
  return convertObjectToCamelCase(response.data);
}
