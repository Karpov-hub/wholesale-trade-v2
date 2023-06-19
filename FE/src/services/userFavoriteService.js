import { api } from "src/boot/axios";
import { convertObjectToCamelCase } from "src/helpers/mapHelper";

export async function getProductFavoriteList() {
  const response = await api.post("user/favorite/get-product-favorite");
  return convertObjectToCamelCase(response.data);
}
export async function addProductFavorite(productId) {
  const response = await api.post("user/favorite/add-product-favorite", {
    id_prod: productId,
  });
  return convertObjectToCamelCase(response.data);
}
export async function deleteProductFavorite(productId) {
  const response = await api.post("user/favorite/delete-product-favorite", {
    id_prod: productId,
  });
  return convertObjectToCamelCase(response.data);
}
