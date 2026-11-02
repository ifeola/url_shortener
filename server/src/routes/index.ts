import { type Router } from "express";
import express from "express";
import userRouter from "./user.routes.ts";
import authRouter from "./auth.routes.ts";

const router: Router = express.Router();

router.use("/", userRouter);
router.use("/register", authRouter);

export default router;
