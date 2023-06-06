import { api } from "../boot/axios.js";
async function getProductShoppingCartList({ session_token, start, limit }) {
  const response = await api.post(
    "user/shoppingCart/get-product-shoppingCart",
    { session_token, start, limit }
  );
  return response.data;
}
async function addProductShoppingCartList({
  session_token,
  id_prod,
  quantity,
}) {
  const response = await api.post(
    "user/shoppingCart/add-product-shoppingCart",
    { session_token, id_prod, quantity }
  );
  return response.data;
}
async function deleteProductShoppingCartList({ session_token, id_prod }) {
  const response = await api.post(
    "user/shoppingCart/delete-product-shoppingCart",
    { session_token, id_prod }
  );
  return response.data;
}
export {
  getProductShoppingCartList,
  addProductShoppingCartList,
  deleteProductShoppingCartList,
};
