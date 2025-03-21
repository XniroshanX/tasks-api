import { NextFunction, Request, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";

export const errorHandler = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.send(err);
};
