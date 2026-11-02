import { type Router } from "express";
import express from "express";
import catchError from "../utils/catchError.ts";
import { register } from "../controllers/auth/authenticate.ts";

const authRouter: Router = express.Router();

authRouter.post("/auth", catchError(register));

export default authRouter;
