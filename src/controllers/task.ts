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

export const getAll = (request: Request, response: Response) => {
  response.send({ status: 'getAll' });
};

export const getById = (request: Request, response: Response) => {
  response.send({ status: 1 });
};

export const update = (request: Request, response: Response) => {
  response.send({ status: 1 });
};

export const remove = (request: Request, response: Response) => {
  response.send({ status: 1 });
};
