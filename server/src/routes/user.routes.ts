import { type Router } from "express";
import express from "express";
import { getAllUsers, getUser } from "../controllers/users/users.contoller.ts";
import catchError from "../utils/catchError.ts";

const userRouter: Router = express.Router();

userRouter.get("/users", catchError(getAllUsers));
userRouter.get("/auth/me", catchError(getUser));

export default userRouter;
