import { Task } from "../types/tasks";
import { create, fetchAll, getByID } from "../models/tasks";
import { randomUUID } from "crypto";
import HttpError from "../errors/http";

export const createTask = async (taskData: Task) => {
  return await create({ id: randomUUID(), ...taskData });
};

export const getAllTasks = async () => {
  return await fetchAll();
};

export const getTaskByID = async (id: string) => {
  const task = await getByID(id);
  if (!task) {
    throw new HttpError(`Task doesn't exist.`);
  }
  return task;
};
