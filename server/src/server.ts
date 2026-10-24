import express, { type Express } from "express";
import cookieParser from "cookie-parser";
import cors, { type CorsOptions } from "cors";
import helmet from "helmet";
import morgan from "morgan";
import errorMiddleware from "./middleware/errorMiddleware.ts";
import router from "./routes/index.ts";

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

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(helmet());
// app.use(morgan("dev"));
app.use(morgan(":method :url :status :response-time ms"));
app.use(errorMiddleware);
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server is lsitening on port ${PORT}`);
});
