// Packages
import { Router } from "express";

// Controllers
import { conversationsController } from "../controllers/conversationsController";

const router = Router();

router.get("/", conversationsController.getAllConversations);
router.post("/", conversationsController.addNewConversation);
router.delete("/", conversationsController.deleteConversation);

export default router;
