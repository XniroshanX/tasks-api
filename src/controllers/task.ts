import { Request, Response } from "express";
import { createTask } from "../services/task";
import { success } from "../utils/response";
import { asyncHandler } from "../utils/handlers";

export const create = asyncHandler(
  async (request: Request, response: Response) => {
    const { title, description, status, createdAt, updatedAt } = request.body;
    const taskCreated = await createTask({
      title,
      description,
      status,
      createdAt,
      updatedAt,
    });
    console.log("🚀 ~ taskCreated:", taskCreated)
    response.send({ status: taskCreated });
  }
);

export const getAll = asyncHandler(
  async (request: Request, response: Response) => {
    success(response, "Successfully fetched");
  }
);

export const getById = asyncHandler(
  async (request: Request, response: Response) => {
    success(response, "Successfully fetched by Id");
  }
);

export const update = asyncHandler(
  async (request: Request, response: Response) => {
    success(response, "Successfully updated");
  }
);

export const remove = asyncHandler(
  async (request: Request, response: Response) => {
    success(response, "Successfully removed");
  }
);
