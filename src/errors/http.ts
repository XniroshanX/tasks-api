import { HttpCode } from "../constants/http";

/**
 * This is an Http Error class for throw http
 * request related errors
 * 
 */
class HttpError extends Error {
  code: HttpCode;
  constructor(
    message: string,
    statusCode: HttpCode = HttpCode.VALIDATION_ERROR
  ) {
    super(message);
    this.code = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default HttpError;
