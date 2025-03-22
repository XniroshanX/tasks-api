export const taskAttributeDefinition = [
  { AttributeName: "id", AttributeType: "S" as const },
];

export const taskSchema = [{ AttributeName: "id", KeyType: "HASH" as const }];
