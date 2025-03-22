import { Request, Response } from "express";
import { createTask, getAllTasks, getTaskByID } from "../services/task";
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
    success(response, "Task created successfully", { status: taskCreated });
  }
);

export const getAll = asyncHandler(
  async (request: Request, response: Response) => {
    const tasks = await getAllTasks();
    success(response, "Successfully fetched", tasks);
  }
);

export const getById = asyncHandler(
  async (request: Request, response: Response) => {
    const taskId = request.params.id;
    const task = await getTaskByID(taskId);
    success(response, "Successfully fetched by Id", task);
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
