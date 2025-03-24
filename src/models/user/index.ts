import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { docClient } from "../../clients/dynamoDB";
import { DeleteCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { User } from "../../types/users";
import { generateUuid } from "../../utils/crypto";

const TABLE_NAME = "users";

export const getCacheEntries = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const cacheEntries = await docClient.send(new ScanCommand(params));
  return cacheEntries;
};

export const fetchAll = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  return await docClient.send(new ScanCommand(params));
};

export const addCacheEntry = async (users: User[]) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: generateUuid(),
      users: JSON.stringify(users),
      createdAt: new Date().toISOString(),
    },
  };
  return await docClient.send(new PutCommand(params));
};

export const removeAllUsers = async () => {
  try {
    const users = await fetchAll(); // Fetching all users
    const items = users.Items; // Get items from the response

    if (items?.length) {
      for (const item of items) {
        const params = {
          removeUndefinedValues: true,
          TableName: TABLE_NAME,
          Key: {
            id: item.id.S,
          },
          ReturnValues: "ALL_OLD" as const,
        };
        await docClient.send(new DeleteCommand(params));
      }
    } else {
      console.log("No users found");
    }
  } catch (error) {
    console.error("Error deleting users:", error);
  }
};
