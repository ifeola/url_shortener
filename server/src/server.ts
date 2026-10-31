import express, { type Express } from "express";
import cors, { type CorsOptions } from "cors";
import helmet from "helmet";
import morgan from "morgan";
import errorMiddleware from "./middleware/errorMiddleware.ts";
import router from "./routes/index.ts";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth.ts";
// import authenticate from "./controllers/auth/session.ts";

const app: Express = express();
const PORT = process.env.PORT || 8080;

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = ["http://localhost:3000", "https://example.com"];
    if (!origin || !allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan(":method :url :status :response-time ms"));
// app.use(morgan("dev"));
// app.use(authenticate);
// app.all("/api/v1/auth/*", toNodeHandler(auth));
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());
app.use(errorMiddleware);
// app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server is lsitening on port ${PORT}`);
});
