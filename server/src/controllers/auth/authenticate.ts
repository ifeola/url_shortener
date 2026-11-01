import type { Request, Response, NextFunction, RequestHandler } from "express";
import { auth } from "../../utils/auth.ts";
import { fromNodeHeaders } from "better-auth/node";
import { AuthenticationError } from "../../utils/customErrors.ts";

const requireAuth: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) return next(new AuthenticationError());
  req.user = session.user;
  next();
};

export default requireAuth;
