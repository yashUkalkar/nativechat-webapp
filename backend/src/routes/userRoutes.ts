// Packages
import { Router } from "express";

// Controller
import { userController } from "../controllers/userController";

const router = Router();

router.get("/getUsers", userController.getUsersByMatchingUsername);

export default router;
