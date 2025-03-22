import { Request, Response, NextFunction } from "express";

export const asyncHandler = (
  func: (request: Request, response: Response, next: NextFunction) => void
) => {
  return (request: Request, response: Response, next: NextFunction) => {
    Promise.resolve(func(request, response, next)).catch(next);
  };
};
