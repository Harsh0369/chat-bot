import express from "express"
import { createChat,getAllChats } from "../controllers/chatController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/new", isAuth, createChat);
router.get("/all", isAuth, getAllChats);

export default router;