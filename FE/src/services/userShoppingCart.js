import { api } from "src/boot/axios";
import { convertObjectToCamelCase } from "src/helpers/mapHelper";

export async function getProductShoppingCartList() {
  const response = await api.post(
    "/user/shoppingCart/get-product-shoppingCart"
  );
  return convertObjectToCamelCase(response.data);
}
export async function addProductShoppingCart(productId, quantity) {
  const response = await api.post(
    "user/shoppingCart/add-product-shoppingCart",
    {
      id_prod: productId,
      quantity: Number(quantity),
    }
  );
  return convertObjectToCamelCase(response.data);
}
export async function deleteProductShoppingCart(productId) {
  const response = await api.post(
    "user/shoppingCart/delete-product-shoppingCart",
    {
      id_prod: productId,
    }
  );
  return convertObjectToCamelCase(response.data);
}
