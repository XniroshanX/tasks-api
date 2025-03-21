import { Request, Response } from "express";
import { createTask } from "../services/task";
import { success } from "../utils/response";

export const create = (request: Request, response: Response) => {
  const { title, description, status, createdAt, updatedAt } = request.body;
  const taskCreated = createTask({
    title,
    description,
    status,
    createdAt,
    updatedAt,
  });
  response.send({ status: taskCreated });
};

export const getAll = (request: Request, response: Response) => {
  success(response, "Successfully fetched");
};

export const getById = (request: Request, response: Response) => {
  success(response, "Successfully fetched by Id");
};

export const update = (request: Request, response: Response) => {
  success(response, "Successfully updated");
};

export const remove = (request: Request, response: Response) => {
  success(response, "Successfully removed");
};
