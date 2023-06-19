import { api } from "src/boot/axios";
import {
  convertObjectToCamelCase,
  convertObjectToSnakeCase,
} from "src/helpers/mapHelper";

export async function updateUserPassword(password) {
  const response = await api.post("user/profile/update-user-password", {
    password,
  });
  return response.data;
}

export async function updateUser(
  data = {
    phone: null,
    password: null,
    firstName: null,
    lastName: null,
    middleName: null,
    deliveryAddress: null,
  }
) {
  const response = await api.post(
    "user/profile/update-user",
    convertObjectToSnakeCase(data)
  );
  return response.data;
}

export async function getData() {
  const response = await api.post("user/profile/get-data");
  return convertObjectToCamelCase(response.data);
}
