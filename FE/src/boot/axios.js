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

api.interceptors.response.use(
  (response) => {
    const isError = Object.keys(errorCodes).includes(response.data.code);
    const errorMessage = errorCodes[response.data.code];

    if (isError) {
      Notify.create({
        message: errorMessage,
        type: "warning",
      });
    }
    return response;
  },
  (error) => {
    if (error === null) throw new Error("Unrecoverable error!! Error is null!");
    if (axios.isAxiosError(error)) {
      // here we have a type guard check, error inside this if will be treated as AxiosError
      const response = error?.response;
      const request = error?.request;
      // const config = error?.config;  here we have access the config used to make the api call (we can make a retry using this conf)

      if (error.code === "ERR_NETWORK") {
        // console.log("network error");
      } else if (error.code === "ERR_CANCELED") {
        // console.log("connection canceled..");
      }
      if (response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx the http status code mentioned above
        const statusCode = response?.status;
        if (statusCode === 404) {
          // console.log(
          //   "The requested resource does not exist or has been deleted"
          // );
        } else if (statusCode === 401) {
          // console.log("Please login to access this resource");
          // redirect user to login
        }
      } else if (request) {
        // The request was made but no response was received, `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js
      }
    }
    // Something happened in setting up the request and triggered an Error
    console.log(error.message);
  }
);

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
