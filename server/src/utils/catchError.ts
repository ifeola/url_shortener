import type { Request, Response, NextFunction } from "express";

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<Response | void>;

const catchError = (callback: AsyncHandler) => {
  return function (req: Request, res: Response, next: NextFunction) {
    callback(req, res, next).catch((error) => next(error));
  };
};

export default catchError;
