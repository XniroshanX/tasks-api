import { Response } from "express";
import { HttpCode } from "../constants/http";

/**
 * 
 *  Below http utilities are helpful to maintain
 *  consistent http response structure across
 *  the application
 * 
 */


// General response function
export const makeResponse = (
  response: Response,
  status: HttpCode,
  message: string = "",
  data: unknown = []
) => {
  return response.status(status).send({ status, message, data });
};

// The success function which send success response
export const success = (
  response: Response,
  message: string,
  data?: unknown
) => {
  makeResponse(response, HttpCode.SUCCESS, message, data);
};

// The success function which send failure response
export const fail = (
  response: Response,
  status: HttpCode,
  message: string,
  data?: unknown
) => {
  makeResponse(response, status, message, data);
};
