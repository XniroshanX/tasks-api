import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(500).json({
    status: false,
    message: error.message || "Internal Server Error",
  });
  next();
};
