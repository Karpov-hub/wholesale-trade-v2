import { api } from "src/boot/axios";
import {
  convertObjectToCamelCase,
  convertObjectToSnakeCase,
} from "src/helpers/mapHelper";

export async function signin({ phone, password }) {
  const response = await api.post("user/auth/signin", { phone, password });
  return convertObjectToCamelCase(response.data);
}
export async function signup(
  obj = {
    phone: null,
    password: null,
    firstName: null,
    lastName: null,
    middleName: null,
  }
) {
  const response = await api.post(
    "user/auth/signup",
    convertObjectToSnakeCase(obj)
  );
  return response.data;
}
