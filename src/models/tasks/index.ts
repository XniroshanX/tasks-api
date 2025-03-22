import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../clients/dynamoDB";
import { Task } from "../../types/tasks";

const TABLE_NAME = "tasks";

export const create = async (task: Task) => {
  console.log("🚀 ~ create ~ task:", task);
  const params = {
    TableName: TABLE_NAME,
    Item: task,
  };

  return await docClient.send(new PutCommand(params));
};
