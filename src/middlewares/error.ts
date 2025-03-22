import { NextFunction, Request, Response } from "express";
import { HttpCode } from "../constants/http";
import HttpError from "../errors/http";
import { fail } from "../utils/response";
import ConnectionError from "../errors/connection";

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof HttpError || error instanceof ConnectionError) {
    return fail(response, error.code, error.message || "Something went wrong");
  }

  fail(
    response,
    HttpCode.SERVER_ERROR,
    `Internal server error. ${error.message}`
  );
  next();
};
