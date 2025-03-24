import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import config from "../config";
import ConnectionError from "../errors/connection";
import { createTaskTableIfNotExist } from "../models/tasks/table";
import { createUserTableIfNotExist } from "../models/user/table";

/**
 * 
 * Client for dynamoDB will created in here.
 * Everytime the application is started it will call `initClient` function.
 * 
 */
const initClient = () => {
  try {
    const client = new DynamoDBClient({
      region: config.AWS_REGION,
      credentials: {
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
      },
    });

    createTaskTableIfNotExist(client);
    createUserTableIfNotExist(client);

    const docClient = DynamoDBDocumentClient.from(client);
    return { client, docClient };
  } catch (error) {
    throw new ConnectionError(
      `Unable to connect DynamoDB. ${(error as Error).message}`
    );
  }
};

const { client, docClient } = initClient();
export { client, docClient };
