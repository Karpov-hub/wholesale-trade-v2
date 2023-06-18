import { boot } from "quasar/wrappers";
import axios from "axios";
import { errorCodes } from "src/helpers/apiErrorCodes";
import { Notify } from "quasar";
// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const api = axios.create({ baseURL: process.env.API_URL });

api.interceptors.request.use((config) => {
  const sessionToken = localStorage.getItem("sessionToken");

  const updatedConfig = {
    ...config,
    data: {
      ...config.data,
      ...(!!sessionToken && { session_token: sessionToken }),
    },
  };

  return updatedConfig;
});

api.interceptors.response.use((response) => {
  const isError = Object.keys(errorCodes).includes(response.data.code);
  const errorMessage = errorCodes[response.data.code];

  if (isError) {
    Notify.create({
      message: errorMessage,
      type: "warning",
    });
  }
  return response;
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  // eslint-disable-next-line no-param-reassign
  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
