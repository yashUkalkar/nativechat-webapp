// Packages
import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import cookieParser from "cookie-parser";

// Configs
import { allowedOrigins } from "./config/cors.config";

// Socket
import { socketInit } from "./socket";

// Routes
import { initializeRoutes } from "./routes";

//* Server Initialization
const app: Express = express();
const httpServer = createServer(app);

dotenv.config();

//* Globals
const PORT: number = Number(process.env.PORT) || 6001;

//* Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
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

//* Initializations
initializeRoutes(app);
socketInit(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server and socket started on ${PORT}`);
});
