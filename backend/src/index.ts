// Packages
import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import cookieParser from "cookie-parser";

// Routes
import authRoutes from "./routes/authRoutes";

// Initializations
const app: Express = express();
const httpServer = createServer(app);
dotenv.config();

// Globals
const PORT: number = Number(process.env.PORT) || 6001;
const CLIENT_URL: string = process.env.CLIENT_URL || "http://localhost:5173";

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_URL,
  })
);
app.use(
  rateLimit({
    windowMs: 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

//* Base endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("Nativechat express server!");
});

//* Route mapping
app.use("/auth", authRoutes);

httpServer.listen(PORT, () => {
  console.log(
    `Server and socket started on ${PORT} and client url is ${CLIENT_URL}`
  );
});
