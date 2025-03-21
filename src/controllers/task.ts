import { Request, Response } from "express";
import { createTask } from "../services/task";

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
