import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { HttpCode } from "../constants/http";

/**
 * This is the middleware for validate
 * the express validator schemas
 * 
 */
export const validate = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    response.status(HttpCode.VALIDATION_ERROR).json({ errors: errors.array() });
  }
  next();
};
