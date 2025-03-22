import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../clients/dynamoDB";
import { Task } from "../../types/tasks";
import {
  DeleteItemCommand,
  GetItemCommand,
  ReturnValue,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const TABLE_NAME = "tasks";

export const create = async (task: Task) => {
  const params = {
    TableName: TABLE_NAME,
    Item: task,
  };
  return await docClient.send(new PutCommand(params));
};

export const fetchAll = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  return await docClient.send(new ScanCommand(params));
};

export const getByID = async (id: string) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: { S: id },
    },
  };
  const task = await docClient.send(new GetItemCommand(params));
  return task.Item ? unmarshall(task.Item) : null;
};

export const updateByID = async (id: string, taskData: Task) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: { S: id },
    },
    UpdateExpression:
      "SET title = :title, description = :description, #status = :status, createdAt = :createdAt, updatedAt = :updatedAt",
    ExpressionAttributeNames: {
      "#status": "status", // Alias for the reserved keyword status
    },
    ExpressionAttributeValues: {
      ":title": { S: taskData.title },
      ":description": { S: taskData.description },
      ":status": { S: taskData.status },
      ":createdAt": { S: new Date(taskData.createdAt).toISOString() },
      ":updatedAt": { S: new Date(taskData.updatedAt).toISOString() },
    },
    ReturnValues: ReturnValue.ALL_NEW,
  };
  const task = await docClient.send(new UpdateItemCommand(params));
  return task.Attributes ? unmarshall(task.Attributes) : null;
};

export const removeTaskById = async (id: string) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: { S: id },
    },
    ReturnValues: "ALL_OLD" as const,
  };
  const task = await docClient.send(new DeleteItemCommand(params));
  return task.Attributes ? unmarshall(task.Attributes) : null;
};
