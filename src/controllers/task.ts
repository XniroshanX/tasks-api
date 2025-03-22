import { Request, Response } from "express";
import {
  createTask,
  getAllTasks,
  getTaskByID,
  updateTaskByID,
  removeById,
} from "../services/task";
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
    const taskId = request.params.id;
    const { title, description, status, createdAt, updatedAt } = request.body;
    const task = await updateTaskByID(taskId, {
      title,
      description,
      status,
      createdAt,
      updatedAt,
    });
    success(response, "Successfully updated", task);
  }
);

export const remove = asyncHandler(
  async (request: Request, response: Response) => {
    const taskId = request.params.id;
    const deletedTask = await removeById(taskId);
    success(response, "Successfully removed", deletedTask);
  }
);
