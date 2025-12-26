import express from "express"
import { createNewSession, getAllChatOfSession, getAllSession } from "../controllers/session.controller.js";

const router = express.Router();


router.get("/user/:email", getAllSession)
router.get("/:sessionId/chats", getAllChatOfSession)
router.post("/", createNewSession)

export default router