import type {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import { CustomError } from "../utils/customErrors.js";

const errorMiddleware: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err instanceof CustomError ? err.statusCode : 500;
  res
    .status(statusCode)
    .json({
      ok: false,
      message: err.message || "Internal server error",
      ...(err && { err }),
    });
};

export default errorMiddleware;
