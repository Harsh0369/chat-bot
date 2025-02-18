import express from "express"
import { createChat,getAllChats,addConversation, getConverstation,deleteChat } from "../controllers/chatController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/new", isAuth, createChat);
router.get("/all", isAuth, getAllChats);
router.post("/:id", isAuth, addConversation);
router.get("/:id", isAuth, getConverstation);
router.delete("/:id", isAuth, deleteChat);

export default router;