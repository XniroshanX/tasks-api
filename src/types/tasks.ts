export type Task = {
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
}
