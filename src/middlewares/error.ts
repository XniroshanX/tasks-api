import { NextFunction, Request, Response } from "express";
import { HttpCode } from "../constants/http";
import HttpError from "../errors/http";
import { fail } from "../utils/response";

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof HttpError) {
    fail(response, error.code, error.message || "Something went wrong");
  }

  response.status(HttpCode.SERVER_ERROR).json({
    status: false,
    message: error.message || "Internal Server Error",
  });
  next();
};
