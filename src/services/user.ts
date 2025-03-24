import { addCacheEntry, getCacheEntries, removeAllUsers } from "../models/user";
import { get } from "../utils/http";

export const fetchAllAndCache = async () => {
  const url = `https://jsonplaceholder.typicode.com/users`;
  const userData = await get(url);
  await addCacheEntry(userData.data);
  return userData;
};

export const checkUserCache = async () => {
  return await getCacheEntries();
};

export const clearCache = async () => {
  return await removeAllUsers();
};
