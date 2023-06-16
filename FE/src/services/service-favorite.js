import { api } from "../boot/axios.js";

async function getProductFavoriteList({ session_token, start, limit }) {
  const response = await api.post("/favorite/get-product-FavoriteList", {
    session_token,
    start,
    limit,
  });
  return response.data;
}
async function addProductFavorite({ session_token, id_prod }) {
  const response = await api.post("/favorite/add-product-Favorite", {
    session_token,
    id_prod,
  });
  return response.data;
}
async function deleteProductFavorite({ session_token, id_prod }) {
  const response = await api.post("/favorite/delete-product-Favorite", {
    session_token,
    id_prod,
  });
  return response.data;
}
export { getProductFavoriteList, addProductFavorite, deleteProductFavorite };
