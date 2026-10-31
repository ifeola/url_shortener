import { type Router } from "express";
import express from "express";
import { getAllUsers, getUser } from "../controllers/users/users.contoller.ts";

const userRouter: Router = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/auth/me", getUser);

export default userRouter;
