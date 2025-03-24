import axios from "axios";

/**
 * Creating axios client is helpfull to manage
 * configuration for http request in one place.
 */
const axiosClient = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const get = async (url: string) => {
  return axiosClient.get(url);
};

export default axiosClient;
