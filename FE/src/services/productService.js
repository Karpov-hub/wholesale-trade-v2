import { api } from "src/boot/axios";
import { convertObjectToCamelCase } from "src/helpers/mapHelper";

export async function getProduct({
  start,
  limit,
  categoryId,
  rating,
  name,
  priceMin,
  priceMax,
}) {
  const response = await api.post("product/get-product", {
    ...(start !== undefined && { start }),
    ...(!!limit && { limit }),
    ...(!!categoryId && { category_id: categoryId }),
    ...(!!rating && { rating }),
    ...(!!name && { name }),
    ...(!!priceMin && { price_min: priceMin.toString() }),
    ...(!!priceMax && { price_max: priceMax.toString() }),
  });
  return convertObjectToCamelCase(response.data);
}
export async function getProductDetails(productId) {
  const response = await api.post("product/get-product-details", {
    product_id: productId,
  });
  return convertObjectToCamelCase(response.data);
}
