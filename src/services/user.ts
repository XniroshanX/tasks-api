import { get } from "../utils/http";

export const fetchAll = () => {
  const url = `https://jsonplaceholder.typicode.com/users`;
  return get(url);
};
