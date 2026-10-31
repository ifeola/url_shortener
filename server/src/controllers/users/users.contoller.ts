import type { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../../utils/auth.ts"; // Your Better Auth instance

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.session);
  console.log(req.session.id);
  return res
    .status(200)
    .json({ ok: true, message: "All users successfully fetched" });
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
};

export { getAllUsers, getUser };
