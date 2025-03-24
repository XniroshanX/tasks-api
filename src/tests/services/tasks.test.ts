import { unmarshall } from "@aws-sdk/util-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandOutput,
  ScanCommand,
  ScanCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import { mockClient } from "aws-sdk-client-mock";
import { Task, TaskStatus } from "../../types/tasks";
import {
  createTask,
  getAllTasks,
  getTaskByID,
  removeById,
  updateTaskByID,
} from "../../services/task";
import {
  DeleteItemCommand,
  GetItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import config from "../../config";

/**
 * Mocking both dotenv and configuration module
 */

jest.mock("dotenv", () => ({
  config: jest.fn(),
}));

jest.mock("../../config", () => ({
  PORT: "8000",
  AWS_REGION: "us-east-1",
  AWS_ACCESS_KEY_ID: "mock-access-key",
  AWS_SECRET_ACCESS_KEY: "mock-secret-key",
}));

describe("Configuration", () => {
  it("should have mocked config values", () => {
    expect(config.PORT).toBe("8000");
    expect(config.AWS_REGION).toBe("us-east-1");
    expect(config.AWS_ACCESS_KEY_ID).toBe("mock-access-key");
    expect(config.AWS_SECRET_ACCESS_KEY).toBe("mock-secret-key");
  });
});

describe("Tasks", () => {
  const dynamoMock = mockClient(DynamoDBDocumentClient);

  beforeAll(() => {
    /**
     * This will prevent the dynamodb connection initialization in models
     */
    jest.mock("@aws-sdk/lib-dynamodb", () => {
      return {
        DynamoDBClient: jest.fn(),
        CreateTableCommand: jest.fn(),
        ResourceInUseException: class extends Error {},
      };
    });
  });

  beforeEach(() => {
    // reset mocks everytime a test case finished
    dynamoMock.reset();
  });

  test("should successfully create a task when correct data provided", async () => {
    const mockedOutput = {
      $metadata: {
        title: "Title 1",
        description: "Sample description",
        status: "PENDING",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    dynamoMock.on(PutCommand).resolves(mockedOutput as PutCommandOutput);
    const result = await createTask({
      ...mockedOutput.$metadata,
      status: TaskStatus.PENDING,
    });
    expect(result).toEqual(mockedOutput);
  });

  test("should successfully fetch all tasks when request", async () => {
    const mockedOutput = {
      $metadata: {
        httpStatusCode: 200,
        requestId: "requestId",
        extendedRequestId: undefined,
        cfId: undefined,
        attempts: 1,
        totalRetryDelay: 0,
      },
      Count: 2,
      Items: [
        {
          createdAt: "2025-01-02",
          description: "Some description",
          id: "bbb8b6de-fa5f-4342-88cf-3a873eb13873",
          updatedAt: "2025-01-02",
          title: "Task 1",
          status: "in-progress",
        },
        {
          createdAt: "2025-03-22T16:59:43.567Z",
          description: "some description",
          id: "bf835e84-45d6-42eb-939d-24bce0a4574f",
          updatedAt: "2025-03-22T16:59:43.568Z",
          title: "title",
          status: "pending",
        },
      ],
    };

    dynamoMock.on(ScanCommand).resolves(mockedOutput as ScanCommandOutput);
    const result = await getAllTasks();
    expect(result).toEqual(mockedOutput);
  });

  test("should successfully fetch a task when id is provided", async () => {
    const mockedOutput = {
      Item: {
        createdAt: { S: "2025-01-02" },
        description: { S: "Task 1" },
        id: { S: "0b92ad1f-de2f-4220-9a02-a0551fe1ac62" },
        updatedAt: { S: "2025-02-03" },
        title: { S: "Task 1" },
        status: { S: "pending" },
      },
    };

    dynamoMock.on(GetItemCommand).resolves(mockedOutput);
    const result = await getTaskByID(mockedOutput.Item.id.S);
    expect(result).toEqual({
      createdAt: "2025-01-02",
      description: "Task 1",
      id: "0b92ad1f-de2f-4220-9a02-a0551fe1ac62",
      updatedAt: "2025-02-03",
      title: "Task 1",
      status: "pending",
    });
  });

  test("should successfully delete a task when id is provided", async () => {
    const mockedOutput = {
      Attributes: {
        createdAt: { S: "2025-01-02" },
        description: { S: "Some description" },
        id: { S: "bbb8b6de-fa5f-4342-88cf-3a873eb13873" },
        updatedAt: { S: "2025-01-02" },
        title: { S: "Task 1" },
        status: { S: "in-progress" },
      },
    };

    dynamoMock.on(DeleteItemCommand).resolves(mockedOutput);
    const result = await removeById(mockedOutput.Attributes.id.S);
    expect(result).toEqual({
      createdAt: "2025-01-02",
      description: "Some description",
      id: "bbb8b6de-fa5f-4342-88cf-3a873eb13873",
      updatedAt: "2025-01-02",
      title: "Task 1",
      status: "in-progress",
    });
  });

  test("should successfully update a task when id and other data provided", async () => {
    const mockedOutput = {
      createdAt: { S: "2025-01-02" },
      description: { S: "Some description" },
      id: { S: "bbb8b6de-fa5f-4342-88cf-3a873eb13873" },
      updatedAt: { S: "2025-01-02" },
      title: { S: "Task 1" },
      status: { S: "in-progress" },
    };

    dynamoMock.on(UpdateItemCommand).resolves({
      $metadata: {},
      Attributes: mockedOutput,
    });

    const result = await updateTaskByID(
      mockedOutput.id.S,
      unmarshall(mockedOutput) as Task
    );

    expect(result).toEqual({
      createdAt: "2025-01-02",
      description: "Some description",
      id: "bbb8b6de-fa5f-4342-88cf-3a873eb13873",
      status: "in-progress",
      title: "Task 1",
      updatedAt: "2025-01-02",
    });
  });
});
