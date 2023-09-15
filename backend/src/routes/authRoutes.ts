// Packages
import { Router } from "express";

// Controller
import { authController } from "../controllers/authController";

const router = Router();

router.post("/signin", authController.signInUser);
router.post("/signup", authController.signUpUser);
router.get("/refresh", authController.handleRefreshToken);
router.post("/signout", authController.signOutUser);

export default router;
