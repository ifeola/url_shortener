import { type Router } from "express";
import express from "express";
import userRouter from "./user.routes.ts";

const router: Router = express.Router();

router.use("/", userRouter);

export default router;
