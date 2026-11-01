import type { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../../utils/auth.ts"; // Your Better Auth instance
import { AuthenticationError } from "../../utils/customErrors.ts";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  return res
    .status(200)
    .json({ ok: true, message: "All users successfully fetched" });
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  if (!session) return next(new AuthenticationError());
  return res.json(session);
};

export { getAllUsers, getUser };
