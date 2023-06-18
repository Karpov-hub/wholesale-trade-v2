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
    ...(!!priceMin && { price_min: priceMin }),
    ...(!!priceMax && { price_max: priceMax }),
  });
  return convertObjectToCamelCase(response.data);
}
