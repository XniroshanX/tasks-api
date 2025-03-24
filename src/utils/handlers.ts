import { Request, Response, NextFunction } from "express";

/* This asyncHandler function handle all the errors for next function inside any controllers or services*/
export const asyncHandler = (
  func: (request: Request, response: Response, next: NextFunction) => void
) => {
  return (request: Request, response: Response, next: NextFunction) => {
    Promise.resolve(func(request, response, next)).catch(next);
  };
};
