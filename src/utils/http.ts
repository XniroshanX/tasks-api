import axios from "axios";

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
