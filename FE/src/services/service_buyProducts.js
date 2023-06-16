import { api } from "../boot/axios.js";

async function buyProducts({ session_token, id_prod }) {
  const response = await api.post("user/buy-products", {
    session_token,
    id_prod,
  });
  return response.data;
}
export { buyProducts };
