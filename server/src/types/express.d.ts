import type { auth } from "../utils/auth.ts";

declare global {
  namespace Express {
    interface Request {
      user?: typeof auth.$Infer.Session.user;
    }
  }
}
