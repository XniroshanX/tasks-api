import { Request, Response } from "express";
import { fetchAll } from "../services/user";
import { success } from "../utils/response";
import { asyncHandler } from "../utils/handlers";

export const getAll = asyncHandler(
  async (request: Request, response: Response) => {
    const users = await fetchAll();
    success(response, "Successfully fetched users", users.data);
  }
);
