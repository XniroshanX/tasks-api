import { Request, Response } from "express";
import { checkUserCache, clearCache, fetchAllAndCache } from "../services/user";
import { success } from "../utils/response";
import { asyncHandler } from "../utils/handlers";
import { getSecondsDifference } from "../utils/time";

export const getAll = asyncHandler(
  async (request: Request, response: Response) => {
    const cache = await checkUserCache();
    const cacheItem = cache.Items?.[0];
    if (
      cache.Count &&
      getSecondsDifference(cacheItem?.createdAt.S as string) < 1 * 60 * 5 // 5 minutes
    ) {
      success(response, "Successfully fetched users", {
        users: JSON.parse(cacheItem?.users.S as string),
      });
    } else {
      await clearCache();
      const users = await fetchAllAndCache();
      success(response, "Successfully fetched users", users.data);
    }
  }
);
