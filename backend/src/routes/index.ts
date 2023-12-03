// Types
import { Express } from "express";

// Routes
import authRoutes from "./authRoutes";
import conversationRoutes from "./conversationRoutes";
import userRoutes from "./userRoutes";

// Middlewares
import { verifyJWT } from "../middlewares/verifyJWT";

const initializeRoutes = (app: Express) => {
  app.use("/auth", authRoutes);
  app.use("/conversations", verifyJWT, conversationRoutes);
  app.use("/users", verifyJWT, userRoutes);
};

export { initializeRoutes };
