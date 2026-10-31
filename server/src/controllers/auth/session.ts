import connectPgSimple from "connect-pg-simple";
import session from "express-session";
import type { RequestHandler } from "express";
import { pool } from "../../database/db.ts";

const PgSession = connectPgSimple(session);
const isProd = process.env.NODE_ENV === "production";

const authenticate: RequestHandler = session({
  store: new PgSession({
    pool: pool,
    tableName: "user_sessions",
    createTableIfMissing: true,
  }),
  name: "sid",
  secret: process.env.JWT_SECRET!,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    httpOnly: true,
    secure: isProd,
    maxAge: 1000 * 60 * 60,
    sameSite: "lax",
  },
});

export default authenticate;
