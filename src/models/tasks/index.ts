import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../clients/dynamoDB";
import { Task } from "../../types/tasks";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";
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
