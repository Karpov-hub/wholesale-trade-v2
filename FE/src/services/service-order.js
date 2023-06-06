import { api } from "../boot/axios.js";

async function getOrders({ session_token, start, limit }) {
  const response = await api.post("order/get-orders", {
    session_token,
    start,
    limit,
  });
  return response.data;
}
async function getOrderModerator({ session_token, start, limit }) {
  const response = await api.post("order/get-order-moderator", {
    session_token,
    start,
    limit,
  });
  return response.data;
}
async function getOrderDetails({ session_token, order_id }) {
  const response = await api.post("order/get-order-details", {
    session_token,
    order_id,
  });
  return response.data;
}
async function updateStatus({ session_token, order_id, status }) {
  const response = await api.post("order/update-status", {
    session_token,
    order_id,
    status,
  });
  return response.data;
}
export { getOrders, getOrderModerator, getOrderDetails, updateStatus };
