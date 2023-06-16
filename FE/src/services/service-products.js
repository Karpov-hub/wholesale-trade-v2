import { api } from "../boot/axios.js";
// app.use("/product", productRouter);
async function getProducts({
  start,
  limit,
  category_id,
  rating,
  name,
  price_min,
  price_max,
}) {
  const response = await api.post("product/get-product", {
    start,
    limit,
    category_id,
    rating,
    name,
    price_min,
    price_max,
  });
  return response.data;
}
async function getProductDetails({ product_id }) {
  const response = await api.post("product/get-product-details", {
    product_id,
  });
  return response.data;
}
async function createProduct({
  sessionToken,
  name,
  categoryId,
  image,
  price,
  quantity,
  description,
}) {
  const response = await api.post("product/create-product", {
    session_token: sessionToken,
    name,
    category_id: categoryId,
    image,
    price,
    description,
    product_quantity: quantity,
  });
  return response.data;
}
async function deleteProduct({ session_token, product_id }) {
  const response = await api.post("product/delete-product", {
    session_token,
    product_id,
  });
  return response.data;
}
async function updateProduct({
  session_token,
  name,
  category_id,
  image,
  price,
  product_id,
  product_quantity,
  description,
}) {
  const response = await api.post("product/update-product", {
    session_token,
    product_id,
    name,
    category_id,
    image,
    price,
    product_quantity,
    description,
  });
  return response.data;
}
export {
  getProducts,
  getProductDetails,
  createProduct,
  deleteProduct,
  updateProduct,
};
