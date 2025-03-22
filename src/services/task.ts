import { Task } from "../types/tasks";
import {
  create,
  fetchAll,
  getByID,
  updateByID,
  removeTaskById,
} from "../models/tasks";
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

export const updateTaskByID = async (id: string, taskData: Task) => {
  const updatedTask = await updateByID(id, taskData);
  if (!updatedTask) {
    throw new HttpError(`Task doesn't update.`);
  }
  return updatedTask;
};

export const removeById = async (id: string) => {
  const deletedTask = await removeTaskById(id);
  if (!deletedTask) {
    throw new HttpError(`Task doesn't deleted.`);
  }
  return deletedTask;
};
