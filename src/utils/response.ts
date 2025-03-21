import { Response } from "express";
import { HttpCode } from "../constants/http";

export const makeResponse = (
  response: Response,
  status: HttpCode,
  message: string = "",
  data: unknown = []
) => {
  response.send({ status, message, data });
};

export const success = (response: Response, message: string, data: unknown) => {
  makeResponse(response, HttpCode.SUCCESS, message, data);
};

export const fail = (
  response: Response,
  status: HttpCode.VALIDATION_ERROR,
  message: string,
  data: unknown
) => {
  makeResponse(response, status, message, data);
};
