import { Task } from "../types/tasks";
import { create } from "../models/tasks";
import { randomUUID } from "crypto";

export const createTask = async (taskData: Task) => {
  return await create({ id: randomUUID(), ...taskData });
};
