import {
  CreateTableCommand,
  DynamoDBClient,
  ResourceInUseException,
} from "@aws-sdk/client-dynamodb";
import { taskAttributeDefinition, taskSchema } from "./schema";

export const createTableIfNotExist = async (client: DynamoDBClient) => {
  try {
    const params = {
      TableName: "tasks",
      AttributeDefinitions: taskAttributeDefinition,
      KeySchema: taskSchema,
      BillingMode: "PROVISIONED" as const,
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    };
    const command = new CreateTableCommand(params);
    await client.send(command);
    console.log("Table created successfully");
    return;
  } catch (error) {
    if (error instanceof ResourceInUseException) {
      console.log("Table already created");
      return;
    }
    throw error;
  }
};
