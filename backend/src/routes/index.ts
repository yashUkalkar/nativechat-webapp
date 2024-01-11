// Types
import { Express } from "express";

// Routes
import authRoutes from "./authRoutes";
import conversationRoutes from "./conversationRoutes";
import userRoutes from "./userRoutes";
import messagesRoutes from "./messagesRoutes";

// Middlewares
import { verifyJWT } from "../middlewares/verifyJWT";

const initializeRoutes = (app: Express) => {
  app.use("/auth", authRoutes);
  app.use("/conversations", verifyJWT, conversationRoutes);
  app.use("/users", verifyJWT, userRoutes);
  app.use("/messages", verifyJWT, messagesRoutes);
};

export { initializeRoutes };
