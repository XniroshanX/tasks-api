import { Request, Response } from "express";

export const errorHandler = (
  err: Error,
  request: Request,
  response: Response
) => {
  response.send(err);
};
