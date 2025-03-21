import { body } from "express-validator";

export const taskCreationValidations = [
  body("title")
    .isString()
    .notEmpty()
    .withMessage("Title must be a string and cannot be empty"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("Description must be a string and cannot be empty"),
  body("status")
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Status must be one of: pending, in-progress, or completed")
    .default("pending"),
  body("createdAt").isISO8601().withMessage("Invalid timestamp for createdAt"),
  body("updatedAt").isISO8601().withMessage("Invalid timestamp for updatedAt"),
];
