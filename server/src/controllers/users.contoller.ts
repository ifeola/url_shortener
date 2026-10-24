import type { Request, Response, NextFunction } from "express";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  return res
    .status(200)
    .json({ ok: true, message: "All users successfully fetched" });
};

export { getAllUsers };
