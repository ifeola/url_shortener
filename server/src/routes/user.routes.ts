import { type Router } from "express";
import express from "express";
import { getAllUsers } from "../controllers/users.contoller.ts";

const userRouter: Router = express.Router();

userRouter.get("/", getAllUsers);

export default userRouter;
