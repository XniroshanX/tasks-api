import {
  CreateTableCommand,
  DynamoDBClient,
  ResourceInUseException,
} from "@aws-sdk/client-dynamodb";
import { taskAttributeDefinition, taskSchema } from "./schema";

/**
 * 
 * This is a script for check the table is created or not in the dynamoDB service.
 * 
 */
export const createUserTableIfNotExist = async (client: DynamoDBClient) => {
  try {
    const params = {
      TableName: "users",
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
    return;
  } catch (error) {
    if (error instanceof ResourceInUseException) {
      return;
    }
    throw error;
  }
};
