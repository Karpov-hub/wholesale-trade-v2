import { api } from "src/boot/axios";
import { convertObjectToCamelCase } from "src/helpers/mapHelper";

export async function getCategories() {
  const response = await api.post("category/get-categories", {});
  return convertObjectToCamelCase(response.data);
}
