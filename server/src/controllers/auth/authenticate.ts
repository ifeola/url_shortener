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

function forwardCookies(headers: Headers, res: Response) {
  const cookies = headers.getSetCookie();
  if (cookies.length) res.setHeader("Set-Cookie", cookies);
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await auth.api.signUpEmail({
      body: req.body,
      headers: fromNodeHeaders(req.headers),
      returnHeaders: true,
    });
    forwardCookies(data.headers, res);
    return res.status(201).json(data.response);
  } catch (error) {
    return next(error);
  }
};

export { requireAuth, register };
