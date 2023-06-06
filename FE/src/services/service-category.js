import { api } from "../boot/axios.js";

async function getCategories() {
  const response = await api.post("category/get-categories", {});
  return response.data;
}
async function updateCategory({ id, name, description }) {
  const response = await api.post("category/update-category", {
    id,
    name,
    description,
  });
  return response.data;
}
async function deleteCategory({ id }) {
  const response = await api.post("category/delete-category", {
    id,
  });
  return response.data;
}
async function getCategoryFilters({ id, name }) {
  const response = await api.post("category/get-category-filters", {
    id,
    name,
  });
  return response.data;
}

export { getCategoryFilters, getCategories, updateCategory, deleteCategory };
