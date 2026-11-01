import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database/db.ts";
import * as schema from "../database/auth-schema.ts";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:8080",
  trustedOrigins: ["http://localhost:3000"],
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
});
