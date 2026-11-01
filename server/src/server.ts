import express, { type Express } from "express";
import cors, { type CorsOptions } from "cors";
import helmet from "helmet";
import morgan from "morgan";
import errorMiddleware from "./middleware/errorMiddleware.ts";
import router from "./routes/index.ts";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth.ts";

const app: Express = express();
const PORT = process.env.PORT || 8080;

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = ["http://localhost:3000", "https://example.com"];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      return callback(null, false);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan(":method :url :status :response-time ms"));
// app.use(morgan("dev"));
// app.all("/api/v1/auth/*", toNodeHandler(auth));
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());
app.use("/api/v1", router);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is lsitening on port ${PORT}`);
});
