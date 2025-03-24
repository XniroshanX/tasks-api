import { HttpCode } from "../constants/http";

/**
 * This is an Error class for throw connection
 * related errors
 */
class ConnectionError extends Error {
  code: HttpCode;
  constructor(message: string, statusCode: HttpCode = HttpCode.SERVER_ERROR) {
    super(message);
    this.code = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ConnectionError;
