import express from "express"
import { Chat } from "../controllers/chatController.js";

const router = express.Router();

router.get("/chat", Chat);

export default router;