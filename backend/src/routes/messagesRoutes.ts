// Packages
import { Router } from "express";

// Controllers
import { messagesController } from "../controllers/messagesController";

const router = Router();

router.get("/", messagesController.getAllConversationMessages);
router.post("/", messagesController.addNewMessage);
router.delete("/", messagesController.deleteMessage);

export default router;
