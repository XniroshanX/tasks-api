import { body, param } from "express-validator";

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

export const taskIdValidations = [
  param("id")
    .isUUID()
    .notEmpty()
    .withMessage("ID must be a valid UUID and cannot be empty"),
];

export const taskUpdateValidations = [
  param("id")
    .isUUID()
    .notEmpty()
    .withMessage("ID must be a valid UUID and cannot be empty"),
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

export const taskDeleteValidations = [
  param("id")
    .isUUID()
    .notEmpty()
    .withMessage("ID must be a valid UUID and cannot be empty"),
];
