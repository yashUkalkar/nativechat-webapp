// Types
import { Express } from "express";

// Routes
import authRoutes from "./authRoutes";

const initializeRoutes = (app: Express) => {
  app.use("/auth", authRoutes);
};

export { initializeRoutes };
