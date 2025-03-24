import { Request, Response } from "express";
import { checkUserCache, clearCache, fetchAllAndCache } from "../services/user";
import { success } from "../utils/response";
import { asyncHandler } from "../utils/handlers";
import { getSecondsDifference } from "../utils/time";

/**
 * All controller functions use asyncHandler,
 * so it's not necessary to call next()
 * when throwing an error.
 */
export const getAll = asyncHandler(
  async (request: Request, response: Response) => {
    const cache = await checkUserCache();
    const cacheItem = cache.Items?.[0];

    // Check if cache(user data) exists and is still valid (within 5 minutes)
    if (
      cache.Count &&
      getSecondsDifference(cacheItem?.createdAt.S as string) < 1 * 60 * 5 // 5 minutes
    ) {
      // Return cached users if valid
      success(response, "Successfully fetched users", {
        users: JSON.parse(cacheItem?.users.S as string),
      });
    } else {
      // Clear outdated cache
      await clearCache();
      // Fetch fresh user data and update cache
      const users = await fetchAllAndCache();
      success(response, "Successfully fetched users", users.data);
    }
  }
);
